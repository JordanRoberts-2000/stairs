async function scrollToTop() {
  if (window.scrollY !== 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

export default scrollToTop;
