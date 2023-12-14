import { Menu, Transition } from '@headlessui/react'
import Anchor from "../anchor/Anchor";
import Routes from "../../routes/routes";

export default function ProfileBubble() {
    return (
        <Menu.Button className="flex items-right justify-end">
            <div>
                <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
            </div>
            <div className="ml-3">
                <p className="text-sm font-medium text-white group-hover:text-black">Tom Cook</p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-black">View profile</p>
            </div>
        </Menu.Button>
    )
}
