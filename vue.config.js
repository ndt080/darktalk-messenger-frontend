module.exports = {
  pwa: {
    name: 'messenger',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    prefer_related_applications: true,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/_vars.scss";
            @import "@/assets/styles/_fonts.scss";
            @import "@/assets/styles/main.scss";
            `,
      },
    },
  },
};
