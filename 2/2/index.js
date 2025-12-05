document.addEventListener("DOMContentLoaded", () => {
    // Number of links on the page
    let links = document.querySelectorAll("a");
    console.log(links.length);
    // Address to which the penultimate link links to
    let penultimateLink = links[links.length - 2];
    console.log(penultimateLink.href);
    // Number of links linking to the institute's website
    let count = 0;
    links.forEach(link => {
        if (link.href.startsWith("https://iesbelen.")) {count++}
    })
    console.log(count);
    // Number of links in the third paragraph
    let thirdP = document.querySelectorAll("p")[2];
    let linksThirdP = thirdP.querySelectorAll("a");
    console.log(linksThirdP.length);

})