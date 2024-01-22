import { Thumbnails } from "./../../../interfaces/comment";
import { Request, Response } from "express";
import { IItemsPlaylistListResponse } from "interfaces/comment";
import Log from "libraries/log";
import Category from "models/category";
import Course from "models/course";
import { getDateTime, getNow } from "utils/common";

const createCourseOrUpdatePlayListYoutube = async (
  req: Request,
  res: Response
) => {
  try {
    const channelId =
      (req.query.channelId as string) || "UCCA0ty3anrudXp-PZ3gPIfQ";
    const mode = (req.query.mode as string) || "Automatic";

    // Xử lý phần course
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      data.items.forEach(async (item: IItemsPlaylistListResponse) => {
        // Tìm hoặc tạo mới category
        const category = await Category.findOne({ name: item.snippet.title });
        let category_id, category_name;
        if (!category) {
          // Tạo mới category nếu không tồn tại
          const newCategory = new Category({
            name: item.snippet.title,
            note: item.snippet.description,
          });

          await newCategory.save();

          // Gán category_id và category_name cho sử dụng trong Course
          category_id = newCategory._id;
          category_name = newCategory.name;
        } else {
          // Nếu category đã tồn tại, sử dụng category_id và category_name trong Course
          category_id = category._id;
          category_name = category.name;
        }

        const checkExistCourse = await Course.findOne({ idPlaylist: item.id });
        if (checkExistCourse) {
          // Cập nhật Course nếu tồn tại
          checkExistCourse.title = item.snippet.title;
          checkExistCourse.cover_image = item.snippet.thumbnails.maxres.url;
          checkExistCourse.description = item.snippet.description;
          checkExistCourse.publishedAt = new Date(item.snippet.publishedAt);
          checkExistCourse.update_at = new Date(getNow());
          await checkExistCourse.save();
        } else {
          // Tạo mới Course nếu không tồn tại
          const newCourse = new Course({
            idPlaylist: item.id,
            title: item.snippet.title,
            cover_image: item.snippet.thumbnails.maxres.url,
            publishedAt: item.snippet.publishedAt,
            create_at: getNow(),
            update_at: getNow(),
            items: [],
            category: category_id,
            category_name: category_name,
            status: "public",
            description: item.snippet.description,
          });

          await newCourse.save();
        }

        // Xử lý phần items course
        if (item.id) {
          const url1 = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.YOUTUBE_API_KEY}&part=snippet&playlistId=${item.id}&maxResults=10`;
          const response1 = await fetch(url1);
          const data1 = await response1.json();

          if (data1) {
            data1.items.forEach(async (item1: any) => {
              const checkExistCourse = await Course.findOne({
                idPlaylist: item.id,
              });
              if (checkExistCourse) {
                const checkExistItem = checkExistCourse.items.find(
                  (item2) => item2.videoId === item1.snippet.resourceId.videoId
                );
                if (!checkExistItem) {
                  checkExistCourse.items.push({
                    publishedAt: item1.snippet.publishedAt,
                    channelId: item1.snippet.channelId,
                    title: item1.snippet.title,
                    description: item1.snippet.description,
                    thumbnails: item1.snippet.thumbnails.maxres,
                    playlistId: item1.snippet.playlistId,
                    videoId: item1.snippet.resourceId.videoId,
                  });
                  await checkExistCourse.save();
                }
              }
            });
          }
        }
      });
    }

    const results = {
      results:
        "Đã cập nhật " + mode + " course thành công vào lúc " + getDateTime(),
    };

    Log.info(results.results);

    return res.json(results);
  } catch (err) {
    Log.error(err);
    return res.sendStatus(500);
  }
};

export default createCourseOrUpdatePlayListYoutube;
