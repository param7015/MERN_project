const useCustomhook = () => {
    // this is for the scrolling to top in every component not related to supabase
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    return { scrollToTop }
}

export default useCustomhook