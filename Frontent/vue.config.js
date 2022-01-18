module.exports = {
  pwa: {
    name: 'messenger',
    themeColor: '#161719',
    prefer_related_applications: true,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/_vars.scss";
            @import "@/assets/styles/_input.scss";
            @import "@/assets/styles/_button.scss";
            @import "@/assets/styles/_fonts.scss";
            @import "@/assets/styles/main.scss";
            `,
      },
    },
  },
};
