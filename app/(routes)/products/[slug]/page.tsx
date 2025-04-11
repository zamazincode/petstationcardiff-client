type PropTypes = {
    slug: string;
};

export default function ProductDetailsPage({ slug }: PropTypes) {
    return (
        <>
            <div>product details {slug}</div>
        </>
    );
}
