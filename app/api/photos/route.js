import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const tag = searchParams.get("tag");
  const limit = Number(searchParams.get("limit") || 8);
  const nextCursor = searchParams.get("next_cursor");

  const expression = tag
    ? `folder:fierce AND tags=${tag}`
    : `folder:fierce`;

  const result = await cloudinary.search
    .expression(expression)
    .sort_by("created_at", "desc")
    .max_results(limit)
    .next_cursor(nextCursor || undefined)
    .execute();

  return Response.json({
    photos: result.resources.map((photo) => ({
      id: photo.public_id,
      url: photo.secure_url,
      createdAt: photo.created_at,
      tags: photo.tags,
    })),
    nextCursor: result.next_cursor || null,
  });
}