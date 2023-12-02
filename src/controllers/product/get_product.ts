import { getIdFromReq, getRoleFromReq, haveToken } from "utils/token";
import { Request, Response } from "express";
import { ROLE } from "constants/user";
import { STATUS_PRODUCT } from "constants/product";
import Product from "models/product";
import Color from "models/color";
import Size from "models/size";
import Rating from "models/rating";
import User from "models/user";

const getProductById = async (req: Request, res: Response) => {
  try {
    const token = haveToken(req);
    const { id } = req.params;

    const product: any = await Product.findById(id)
      .populate([
        {
          path: "color_ids",
          select: "name code",
          model: Color,
        },
        {
          path: "size_ids",
          select: "size",
          model: Size,
        },
      ])
      .populate({
        path: "stock",
        select: "color_id size_id quantity",
        model: "Stock",
        populate: [
          {
            path: "size_id",
            select: "size",
            model: Size,
          },
          {
            path: "color_id",
            select: "name code",
            model: Color,
          },
        ],
      })
      .select("name price price_sale description images stock");

    if (!product) return res.sendStatus(404);

    const ratingProduct = await Rating.findOne({ product_id: id })
      .populate({
        path: "ratings",
        select: "user_id rating comment created_at",
        model: "Rating",
        populate: [
          {
            path: "user_id",
            select: "full_name avatar email",
            model: "User",
          },
          {
            path: "size_id",
            select: "size",
            model: Size,
          },
          {
            path: "color_id",
            select: "name",
            model: Color,
          },
        ],
      })
      .select("average_rating ratings");

    let isFavorite = false;
    if (token) {
      const user = await User.findById(getIdFromReq(req));

      if (user) {
        isFavorite = user.favorite_products.some(
          (item) => item.toString() === id
        );
      }
    }

    const productDetail = {
      ...product._doc,
      ratings: ratingProduct?.ratings || [],
      average_rating: ratingProduct?.average_rating || 0,
      isFavorite,
    };

    return res.status(200).json(productDetail);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default getProductById;
