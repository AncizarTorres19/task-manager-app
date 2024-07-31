export const Spinner = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]" data-testid="spinner-overlay">
            <div className="w-10 h-10 bg-gray-800 animate-rotate-plane"></div>
        </div>
    )
}
