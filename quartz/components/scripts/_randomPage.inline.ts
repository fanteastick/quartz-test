import { FullSlug, getFullSlug, pathToRoot, simplifySlug } from "../../util/path"

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

async function navigateToRandomPage() {
    const fullSlug = getFullSlug(window)
    const data = await fetchData
    const allPosts = Object.keys(data).map((slug) => simplifySlug(slug as FullSlug))
    // window.location.href = `${pathToRoot(fullSlug)}/${allPosts[getRandomInt(allPosts.length - 1)]}`
    let newSlug = `${pathToRoot(fullSlug)}/${allPosts[getRandomInt(allPosts.length - 1)]}`;

    if (newSlug === fullSlug) {
      // Generate a new random slug until it's different from the starting fullSlug
      do {
        newSlug = `${pathToRoot(fullSlug)}/${allPosts[getRandomInt(allPosts.length - 1)]}`;
      } while (newSlug === fullSlug);
    }
    window.location.href = newSlug;
}

document.addEventListener("nav", async (e: unknown) => {
//   const slug = (e as CustomEventMap["nav"]).detail.url
  const button = document.getElementById("random-page-button")
  button?.removeEventListener("click", navigateToRandomPage)
  button?.addEventListener("click", navigateToRandomPage)
})
