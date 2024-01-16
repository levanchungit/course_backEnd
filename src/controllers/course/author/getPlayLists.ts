import { Request, Response } from "express";
import { IItemsPlaylistListResponse } from "interfaces/comment";
import Category from "models/category";
import Course from "models/course";
import { getNow } from "utils/common";

const getPlayLists = async (req: Request, res: Response) => {
  try {
    // const page = parseInt(req.query.page as string) || 1;
    // const limit = parseInt(req.query.limit as string) || 10;
    // const sortDirection = (req.query.sort as string) || "asc";
    const channelId =
      (req.query.channelId as string) || "UCCA0ty3anrudXp-PZ3gPIfQ";

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

        const checkExistCourse = await Course.findOne({ idPlaylist: item.id});
        if (checkExistCourse){
          // Cập nhật Course nếu tồn tại
          checkExistCourse.title = item.snippet.title;
          checkExistCourse.cover_image = item.snippet.thumbnails.default.url;
          checkExistCourse.description = item.snippet.description;
          checkExistCourse.publishedAt = new Date(item.snippet.publishedAt);
          checkExistCourse.update_at = new Date(getNow());
          await checkExistCourse.save();
        } else {
          // Tạo mới Course nếu không tồn tại
          const newCourse = new Course({
            idPlaylist: item.id,
            title: item.snippet.title,
            cover_image: item.snippet.thumbnails.default.url,
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
      });
    }

    // Xử lý phần items course
    const url1 = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.YOUTUBE_API_KEY}&part=snippet&playlistId=PLwQaTWy7r4yMM0cLle7dU3053dbia-P7l&maxResults=10`;

    const results = {
      results: "OK",
    };

    return res.json(data.items);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export default getPlayLists;
