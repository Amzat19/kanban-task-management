import DesktopKanbanLogo from '../../public/assets/desktop-kanban-logo.svg';
import Board from '../../public/assets/board.svg';
import EyeSlash from '../../public/assets/eye-slash.svg';
import Moon from '../../public/assets/moon.svg';
import Sunlight from '../../public/assets/sunlight.svg';

const SideBar = () => {
    return (
        <aside className='bg-white min-h-screen w-[16.25rem] flex flex-col justify-between border-r border-r-lightBlue desktop:w-[18.75rem]'>
            <div className='pt-8'>
                <div className='flex gap-1 px-[1.6rem] items-center pb-[3.3rem]'>
                    <DesktopKanbanLogo />
                </div>
                <nav>
                    <ul>
                        <li className='px-[1.6rem] text-lightGray text-xs font-medium pb-[1.1rem]'>ALL BOARDS (3)</li>
                        <li className='px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-lightGray'>
                            <Board />
                            Platform Launch
                        </li>
                        <li className='px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-lightGray'>
                            <Board />
                            Marketing Plan
                        </li>
                        <li className='px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-lightGray'>
                            <Board />
                            Roadmap
                        </li>
                        <li className='px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-purple'>
                            <Board className="stroke-purple" />
                            + Create New Board
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='mx-3 '>
                <div className='flex justify-between items-center h-12 bg-lightBlueBg rounded-md px-9'>
                    <Sunlight width={25} height={25} />
                    <span className='w-12 bg-purple h-6 rounded-2xl relative'>
                        <span className='h-4 rounded-[50%] bg-white w-4 absolute top-1 left-1'></span>
                    </span>
                    <Moon width={25} height={25} />
                </div>
                <span className='flex gap-3 items-center mt-6 text-lightGray text-medium font-semibold mb-11'>
                    <EyeSlash />
                    Hide Sidebar
                </span>
            </div>
        </aside>
    )
};

export default SideBar;