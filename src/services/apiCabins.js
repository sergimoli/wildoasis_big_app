import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  //this is how it came from supabase:
  //   let { data: cabins, error } = await supabase.from("cabins").select("*");
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded!");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log("newCabin, id", newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); //this is a trick. in this case we will not create a new one...

  // we need a name like this: https://zvvoldyfzrzhipgpmfgx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // we do the replaceAll to avoid it creates folders...
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create/edit cabin
  let query = supabase.from("cabins");
  // A) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("cabin could not be created!");
  }

  // 2. upload image
  if (hasImagePath) return data;

  // const avatarFile = event.target.files[0];
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. delete the cabin if there is an error uplading the image.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "cabin image could not be uploaded and the cabin was not created!"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("cabins could not be deleted!");
  }

  return null;
}
