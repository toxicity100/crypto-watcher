const useLoad = (setWatchList) => {
    window.addEventListener('load', () => {
        const selectedCoins = JSON.parse(localStorage.getItem("selectedCoins"));
        setWatchList(selectedCoins);
    });
}

export default useLoad;