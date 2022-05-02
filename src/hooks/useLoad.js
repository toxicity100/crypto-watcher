const useLoad = (setWatchList) => {
    window.addEventListener('load', () => {
        setWatchList(JSON.parse(localStorage.getItem("selectedCoins")));
    });
}

export default useLoad;