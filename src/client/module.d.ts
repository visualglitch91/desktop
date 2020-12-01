declare interface Window {
  isDesktop: boolean;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}
