module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('dwodczt0e'),
          api_key: env('246222394918621'),
          api_secret: env('7R2jwsxRXL9VZrU5CH1YlgGGVxc'),
        },
        actionOptions: {
          upload: { folder: 'images'},
          uploadStream: {},
          delete: {},
        },
      },
    },
    // ...
  });