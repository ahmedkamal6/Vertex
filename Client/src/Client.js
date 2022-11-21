import sanityClient from'@sanity/client'
import imageUrlBuilder from '@sanity/image-url';


const Client = sanityClient({
    projectId:import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset:'production',
    apiVersion:'2022-11-12',
    useCdn:true,
    token:import.meta.env.VITE_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
})

const builder = imageUrlBuilder(Client);

export const urlFor = (source) => builder.image(source)

export default Client