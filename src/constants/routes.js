const ROUTES = {
    home: "/",
    main: "/main",
    postInfo: "/post/:postId",
    analytics: "/analytics",
}

export const getPostInfoPath = (postId) => {
    return ROUTES.postInfo.replace(':postId', postId);
};

export default ROUTES;