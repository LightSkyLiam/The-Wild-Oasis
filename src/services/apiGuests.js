import supabase from "./supabase";

export const updateGuestInfo = async (guestObj) => {
  const { guestID } = guestObj;
  delete guestObj.guestID;
  const { data, updateError } = await supabase
    .from(`guests`)
    .update({ ...guestObj })
    .eq(`id`, guestID)
    .select();
};
