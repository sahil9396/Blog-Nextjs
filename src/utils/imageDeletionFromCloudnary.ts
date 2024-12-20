import { v2 as cloudinary } from "cloudinary";

export const deleteAllImage = async () => {
  try {
    await new Promise((resolve) => {
      cloudinary.api.delete_all_resources(
        {
          type: "upload",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.log("Failed to delete all images", error);
            throw new Error("Failed to delete all images");
          }
          resolve(result);
        }
      );
    });
  } catch (error) {
    console.log("Failed to delete all images", error);
    throw new Error("Failed to delete all images");
  }
};

export const deleteImageById = async (publicId: string) => {
  try {
    await new Promise((resolve) => {
      cloudinary.api.delete_resources(
        [publicId],
        { type: "upload", resource_type: "image" },
        (error, result) => {
          if (error) {
            console.log("Failed to delete image", error);
            throw new Error("Failed to delete image");
          }
          resolve(result);
        }
      );
    });
  } catch (error) {
    console.log("Failed to delete image", error);
    throw new Error("Failed to delete image");
  }
};
