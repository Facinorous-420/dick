import { createIcons, icons } from "lucide"

(function () {
    "use strict"

    // Lucide Icons
    createIcons({
        icons,
        nameAttr: "data-lucide",
    })
    window.lucide = {
        createIcons: createIcons,
        icons: icons,
    }
})()
