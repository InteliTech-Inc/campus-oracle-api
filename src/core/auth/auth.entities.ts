import { Session } from "@supabase/supabase-js";

type PartialSession = Pick<Session, "refresh_token" | "access_token"> & {
  /// Determines if the user will have to create new profile or not
  is_new_user: boolean;
};

export default PartialSession;
