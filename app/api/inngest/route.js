import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";

// create an api that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        /*your functions will be here later */
        syncUserCreation,
        syncUserUpdation,
        syncUserDeletion,
    ],
});       
