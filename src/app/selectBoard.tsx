import BoardLogo from '../../public/assets/board.svg';
import Sunlight from '../../public/assets/sunlight.svg';
import Moon from '../../public/assets/moon.svg';

interface SelectBoardProps {
    isSelectBoardOpen: boolean;
    theme: string | undefined;
    setTheme: (theme: string) => void;
    toggleSelectBoard: () => void;
}

const SelectBoard: React.FC<SelectBoardProps> = ({ isSelectBoardOpen, theme, setTheme, toggleSelectBoard }) => {

    const stopElementEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the parent dialog
    };

    return (
        <dialog open={isSelectBoardOpen} className='absolute top-16 h-screen w-screen bg-[#000] bg-opacity-60' onClick={() => toggleSelectBoard()}>
            <article className='bg-white w-[16.5rem] mt-4 rounded-lg p-4 mx-auto dark:bg-darkGray' onClick={stopElementEventPropagation}>
                <nav>
                    <ul>
                        <li className='px-[1.6rem] text-lightGray text-xs font-medium pb-[1.1rem] w-max tracking-[0.15rem]'>ALL BOARDS (3)</li>
                        <li className='px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-lightGray w-max'>
                            <BoardLogo />
                            Platform Launch
                        </li>
                        <li className='px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-lightGray w-max'>
                            <BoardLogo />
                            Marketing Plan
                        </li>
                        <li className='px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-lightGray w-max'>
                            <BoardLogo />
                            Roadmap
                        </li>
                        <li className='px-[1.6rem] flex items-center h-12 gap-2 text-medium font-semibold text-purple w-max'>
                            <BoardLogo />
                            + Create New Board
                        </li>
                    </ul>
                </nav>
                <div className='mx-3 '>
                    <div className='flex justify-between items-center h-12 bg-lightBlueBg rounded-md px-9 dark:bg-veryDarkGray'>
                        <Sunlight width={20} height={20} />
                        <span className='w-12 bg-purple h-5 rounded-2xl relative'>
                            <span className={`h-3 rounded-[50%] bg-white w-3 absolute top-1 left-1 ${theme === "dark" ? 'right-1 left-auto ease-in' : null}`} onClick={() => theme === "dark" ? setTheme('light') : setTheme("dark")}></span>
                        </span>
                        <Moon width={20} height={20} />
                    </div>
                </div>
            </article>
        </dialog>
    )
};

export default SelectBoard;