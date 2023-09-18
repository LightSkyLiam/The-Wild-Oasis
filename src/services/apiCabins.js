import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be loaded`);
  }
  return data;
};

const deleteImage = async (imageName) => {
  const { data, error } = await supabase.storage
    .from(`cabin-images`)
    .remove([imageName]);

  if (error) {
    console.error(error);
    throw new Error(`There Was An Error Deleting The Image`);
  }
};

export const deleteCabin = async ({ cabinId, imageName }) => {
  await deleteImage(imageName);
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);
  if (error) {
    console.error(error);
    throw new Error(`Couldn't delete Cabin`);
  }
  return data;
};

const createImageInfo = (image) => {
  const imageName = `${Math.random()}-${image}`.replace(`/`, ``);
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  return { imageName, imagePath };
};
const uploadImage = async (imageName, imageFile) => {
  const { storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageFile);
  if (storageError) {
    return storageError;
  }
};
const addCabinApi = async (cabinObj) => {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinObj])
    .select()
    .single();
  return { data, error };
};
export const addCabin = async (cabinObj) => {
  const { imageName, imagePath } = createImageInfo(cabinObj.image.name);
  const storageError = await uploadImage(imageName, cabinObj.image);
  if (storageError)
    throw new Error(`Cabin image could not be created, cabin was not created`);
  const { data, error } = await addCabinApi({
    ...cabinObj,
    image: imagePath,
    imageName: imageName,
  });
  if (error) {
    console.error(error);
    throw new Error(`Couldn't add Cabin`);
  }
  return data;
};

export const duplicateCabin = async (cabinObj) => {
  const { error } = await addCabinApi(cabinObj);
  if (error) {
    console.error(error);
    throw new Error(`Couldn't Duplicate Cabin`);
  }
};

export const updateCabin = async (cabinObj) => {
  const lastImageName = cabinObj.lastImageName;
  delete cabinObj.lastImageName;
  const hasImagePath = cabinObj.image?.startsWith?.(supabaseUrl);
  let imagePath, imageName;
  if (hasImagePath) {
    imagePath = cabinObj.image;
  }
  if (!hasImagePath) {
    const imageInfo = createImageInfo(cabinObj.image[0].name);
    imagePath = imageInfo.imagePath;
    imageName = imageInfo.imageName;
    await uploadImage(imageName, cabinObj.image[0]);
  }
  const { data, updateError } = await supabase
    .from("cabins")
    .update({
      ...cabinObj,
      image: imagePath,
      imageName,
    })
    .eq("id", cabinObj.id)
    .select();

  if (updateError) {
    console.error(updateError);
    throw new Error(`Cabin could not be updated`);
  }
  if (!hasImagePath) await deleteImage(lastImageName);
};
