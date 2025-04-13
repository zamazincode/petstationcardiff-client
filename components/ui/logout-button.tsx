import { logoutAction } from "@/data/actions/auth-actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    return (
        <form action={logoutAction} className="w-full block p-0">
            <button
                type="submit"
                className="flex justify-between items-center text-white transition-colors w-full cursor-pointer bg-primary h-full py-1.5 px-2 rounded-md mt-3 mb-2 hover:bg-primary/90 text-sm"
            >
                Logout
                <LogOut className="text-inherit" />
            </button>
        </form>
    );
}
