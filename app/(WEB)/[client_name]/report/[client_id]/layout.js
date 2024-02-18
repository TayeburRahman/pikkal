
export async function generateMetadata({ params, searchParams }, parent) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients/${params.client_name}/report/${params.client_id}`).then((res) => res.json());

    // Sanitize the client description to remove HTML tags
    const description = stripHtml(response?.client?.Desc);

    // Return the metadata with sanitized description
    return {
      title: response?.client?.Client_Name
        ? `${response?.client?.Client_Name} on Podfolio (presented by Pikkal & Co)`
        : `Not Found | Podfolio (presented by Pikkal & Co)`,
      description: description || '', // Sanitized description without HTML
    };
}

// Utility function to strip HTML from a string
function stripHtml(html) {
    // Check if the input is a string
    if (typeof html !== 'string') return '';

    // Use a regular expression to remove HTML tags
    return html.replace(/(<([^>]+)>)/ig, '');
}

export default function Layout({ children }) {
    return (
        <>
            <div className="min-h-screen">{children}</div>
        </>
    );
}
