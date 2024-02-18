export const metadata = {
  title: 'Podfolio | Active Profiles',
  description: 'Podfolio is a podcast portfolio platform for podcasters to showcase their work and connect with potential clients.',
}


export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen">{children}</div>
    </>
  );
}
