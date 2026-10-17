import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import SkipLinks from "components/layout/SkipLinks";

function Layout({
  children,
  locale,
  site,
  page,
  ancestor,
  grandParent,
  parent,
  headerTxt = "color",
}) {
  return (
    <>
      <SkipLinks locale={locale} />
      <Header
        page={page}
        locale={locale}
        site={site}
        ancestor={ancestor}
        grandParent={grandParent}
        parent={parent}
        headerTxt={headerTxt}
      />
      <main id="content">{children}</main>
      <Footer id="footer" site={site} locale={locale} />
    </>
  );
}

export default Layout;
