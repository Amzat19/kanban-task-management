const EmptyBoard = () => {
    return (
        <section className='w-80 mx-auto flex flex-col mt-[45vw] md:mt-[20vw]'>
            <p className="text-center text-lg font-semibold text-lightGray leading-none">This board is empty. Create a new column to get started.</p>
            <button className='border-none bg-purple rounded-2xl px-4 py-1 mt-4 text-white text-[15px] font-semibold w-max self-center md:h-12 md:rounded-3xl'>+ Add New Column</button>
        </section>
    )
};

export default EmptyBoard;