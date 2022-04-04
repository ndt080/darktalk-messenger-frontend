module.exports = {
  pwa: {
    name: 'DarkTalk',
    short_name: 'DarkTalk',
    theme_color: '#161719',
    background_color: '#161719',
    display: 'standalone',
    prefer_related_applications: true,
    themeColor: '#161719',
    msTileColor: '#161719',
    manifestOptions: {
      background_color: '#161719'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/_vars.scss";
            @import "@/assets/styles/_scroll.scss";
            @import "@/assets/styles/_input.scss";
            @import "@/assets/styles/_button.scss";
            @import "@/assets/styles/_fonts.scss";
            @import "@/assets/styles/main.scss";
            `,
      },
    },
  },
};
