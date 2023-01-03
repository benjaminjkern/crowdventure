import { getSession } from "../pages/_app";

export const userSessionServerSideProps = async ({ req, res }) => {
    const session = await getSession(req, res);

    return {
        props: {
            user: session.user,
        },
    };
};
