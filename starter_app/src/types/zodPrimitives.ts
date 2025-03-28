import { z } from "zod";

// primitive values
export const ZText = () => z.string();
export const ZNumber = () => z.coerce.number();
export const ZBoolean = () => z.coerce.boolean();
export const ZDate = () => z.coerce.date();

// custom primitive values
export const ZEmail = () =>
    z.string().email({ message: "Invalid email address" });
export const ZPhone = () =>
    z.string().regex(/^(?:\+?\d{1,3})?[-. ]?\(?\d{1,4}\)?[-. ]?\d{1,4}[-. ]?\d{1,9}$/,{ message: "Invalid phone number" });
export const ZPassword = () =>
    z.string().min(6, { message: "Password must be at least 6 characters" });  
export const ZUrl = () =>
    z.string().regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Invalid URL" });
export const ZHash = () => z.string();
// export const ZDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {message: "Date must be in YYYY-MM-DD format",});