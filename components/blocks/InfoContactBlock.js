import ExternalLink from "components/links/ExternalLink";
import t from "lib/locales";

export default function InfoContactBlock({ locale, record }) {
    return (
        <>
            <section className="container">
                <div className="grid gap-4 md:grid-cols-12 pb-10">
                    <div className="md:col-span-5 md:col-start-1 lg:col-start-2">
                        <p className="text-base">{t("address", locale)}</p>
                        <p className="text-lg lg:text-xl pb-6">Cantiere Creativo <br /> Via Francesco Botticini, 3 <br /> 05100 Firenze - Italy</p>
                    </div>
                    <div className="md:col-start-7 md:col-span-5">
                        <p className="text-base">{t("email", locale)}</p>
                        <ExternalLink
                            url="mailto:info@cantierecreativo.net"
                            label={t("address", locale)}
                            className="text-lg block pt-1 pb-9"
                        >
                            info@cantierecreativo.net
                        </ExternalLink>
                        <p className="text-base">PEC</p>
                        <ExternalLink
                            url="mailto:info@cantierecreativo.net"
                            label="PEC"
                            className="text-lg block pt-1 pb-9"
                        >
                            info@cantierecreativo.net
                        </ExternalLink>
                        <p className="text-base">{t("phone", locale)}</p>
                        <ExternalLink
                            url="tel:+393501083703"
                            label={t("phone", locale)}
                            className="text-lg block pt-1 pb-9"
                        >
                            Tel: +39 350 108 3703
                        </ExternalLink>
                        <p className="text-base">Social Media</p>
                        <div className="flex flex-col md:flex-row gap-1 md:gap-4 py-2 lg:gap-5 grid-col-1 col-start-1">
                            <ExternalLink
                                url=""
                                label="Linkedin"
                                className="inline-block"
                            >
                                <span className="text-lg md:pt-1 md:pb-9">Linkedin</span>
                            </ExternalLink>
                            <ExternalLink
                                url=""
                                label="Instagram"
                                className="inline-block"
                            >
                                <span className="text-lg  md:pt-1 md:pb-9">Instagram</span>
                            </ExternalLink>
                            <ExternalLink
                                url=""
                                label="Facebook"
                                className="inline-block"
                            >
                                <span className="text-lg pt-0 md:pt-1 md:pb-9">Facebook</span>
                            </ExternalLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
