import { ReactNode } from "react";
import Sidebar from "../Sidebar";

export default function Template({children}: {children: ReactNode}){
    return(
            <main className="flex">
                <Sidebar />
                    <div className="w-full">
                       {children}
                    </div>
            </main>
    );
}