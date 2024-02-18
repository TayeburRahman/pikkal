import { NextResponse } from "next/server";
import puppeteer from 'puppeteer';

export async function POST(req) {
    const body = await req.json();
    const { profile } = body;

    if (!profile) {
        return NextResponse.json({ error: 'No page URL provided' }, { status: 400 });
    }

    const pageUrl = `${process.env.NEXT_PUBLIC_API_URL}/${profile}`;

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--font-render-hinting=none',
                '--ignore-certificate-errors',
                '--window-size=2116,1191',
                '--start-maximized',

                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials',
                '--autoplay-policy=user-gesture-required',
                '--disable-background-networking',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-breakpad',
                '--disable-client-side-phishing-detection',
                '--disable-component-update',
                '--disable-default-apps',
                '--disable-dev-shm-usage',
                '--disable-domain-reliability',
                '--disable-extensions',
                '--disable-features=AudioServiceOutOfProcess',
                '--disable-hang-monitor',
                '--disable-ipc-flooding-protection',
                '--disable-notifications',
                '--disable-offer-store-unmasked-wallet-cards',
                '--disable-popup-blocking',
                '--disable-print-preview',
                '--disable-prompt-on-repost',
                '--disable-renderer-backgrounding',
                '--disable-setuid-sandbox',
                '--disable-speech-api',
                '--disable-sync',
                '--hide-scrollbars',
                '--ignore-gpu-blacklist',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-default-browser-check',
                '--no-first-run',
                '--no-pings',
                '--no-sandbox',
                '--no-zygote',
                '--password-store=basic',
                '--use-gl=swiftshader',
                '--use-mock-keychain'
            ],
            ignoreHTTPSErrors: true,
            defaultViewport: null
        });

        const page = await browser.newPage();
        await page.evaluateHandle('document.fonts.ready')

        await page.setViewport({ width: 2116, height: 1191 });
        await page.emulateMediaType('screen');

        await page.goto(pageUrl, { waitUntil: 'networkidle0', timeout: 0 });

        await page.addStyleTag({
            content: `
              @media screen {
                .no-print {
                  display: none;
                }

                .content-section {
                    break-inside: avoid;
                    page-break-inside: avoid;
                  }

                .page-break {
                    display: block;
                    page-break-before: always;
                  }

                .section-title{
                    margin-top: 40px;
                }

                .print-flex-row{
                    flex-direction: row !important;
                }

                .print-display-none{
                    display: none !important;
                }

                .print-display-block{
                    display: block !important;
                }
              }
            `
        });
        // content-section apply this class to every component that shouldn't be cut off between to pages of your PDF

        // page-break  apply this class to every component that should always display on next page
        const headerHtml = `
        <div style="font-size: 10px; font-weight: bold; text-align: center; width: 100%; color: #eee">
            Public Speaker Profile prepared by Pikkal.com and downloaded from Podfol.io
        </div>`;


        const pdfBuffer = await page.pdf({
            // format: 'A4',

            printBackground: true,
            scale: 0.8,
            displayHeaderFooter: true, // Enable headers and footers
            headerTemplate: headerHtml, // Use the header HTML
            footerTemplate: '<div></div>', // Empty footer
            margin: {
                top: '20mm',
                right: '10mm',
                bottom: '20mm',
                left: '10mm'
            },
            // fullPage: true
            width: 794,
            height: 1123
        });

        await browser.close();

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=download.pdf'
            }
        });

    } catch (error) {
        console.error("Error:", error.message);
        return new NextResponse(
            JSON.stringify({
                message: error.message,
                error: error.message,
            }),
            {
                status: 202,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    }
}
