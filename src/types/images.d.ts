declare module "@/images/*.avif" {
    import type { StaticImageData } from "next/image";
    const content: StaticImageData;
    export default content;
}

declare module "@/images/*.jpg" {
    import type { StaticImageData } from "next/image";
    const content: StaticImageData;
    export default content;
}

declare module "@/images/*.png" {
    import type { StaticImageData } from "next/image";
    const content: StaticImageData;
    export default content;
}
