import Button from "./components/ui/Button/Button.jsx";
import Icon from "./components/ui/Icon/Icon.js";
import Input from "./components/ui/Input/Input.jsx";
import Textarea from "./components/ui/Textarea/Textarea.jsx";
import {useState} from "react";
import SearchInput from "./components/ui/Input/SearchInput.jsx";
import Radio from "./components/ui/Button/Radio.jsx";
import Checkbox from "./components/ui/Button/Checkbox.jsx";
import Switch from "./components/ui/Button/Switch.jsx";
import Select from "./components/ui/Select/Select.jsx";
import Badge from "./components/ui/Badge/Badge.jsx";
import Table from "./components/ui/Table/Table.jsx";
import Pagination from "./components/ui/Pagination/Pagination.jsx";
import Modal from "./components/ui/Model/Model.jsx";
import Tabs from "./components/ui/Tabs/Tabs.jsx";
import Accordion from "./components/ui/Acodrion/Acordion.jsx";
// import CookieBanner from "./components/ui/CookieBanner/CookieBanner.jsx";
import Breadcrumbs from "./components/ui/Breadcrumb/Breadcrumb.jsx";
import Tooltip from "./components/ui/Tooltip/Tooltip.jsx";
import "./js/Tooltip/tooltip.js";
import Link from "./components/ui/Link/Link.jsx";
import ToastProvider from "./components/ui/Toast/ToastProvider.jsx";
import {toast} from "./js/Toast/toast";
import Spinner from "./components/ui/Spinner/Spinner.jsx";
import StatusTag from "./components/ui/StatusTag/StatusTag.jsx";
import TagGroup from "./components/ui/StatusTag/TagGroup.jsx";
import Chip from "./components/ui/Chip/Chip.jsx";
import Avatar from "./components/ui/Avatar/Avatar.jsx";
import AvatarStack from "./components/ui/Avatar/AvatarStack.jsx";
import InlineMessage from "./components/ui/InlineMessage/InlineMessage.jsx";
import InfoBox from "./components/ui/InfoBox/InfoBox.jsx";
import Banner from "./components/ui/Banner/Banner.jsx";
import BadgeButton from "./components/ui/BadgeButton/BadgeButton.jsx";
import DateInput from "./components/ui/Input/DateInput.jsx";
import DatePicker from "./components/ui/DatePicker/DatePicker.jsx";
import Flag from "./components/ui/Flag/Flag.jsx";
import FileUpload from "./components/ui/FileUpload/FileUpload.jsx";
import Dropzone from "./components/ui/Dropzone/Dropzone.jsx";
import Footer from "./components/ui/Footer/Footer.jsx";
import ageLogo from "./assets/logos/age.svg";
import govLogo from "./assets/logos/gov.svg";
import mastercardLogo from "./assets/logos/payment-method-mastercard.svg";
import visaLogo from "./assets/logos/payment-method-visa.svg";
import mpayLogo from "./assets/logos/mpay.png";
import appstoreBadge from "./assets/logos/app-store-badge.svg";
import playmarketBadge from "./assets/logos/play-markep.svg";

function App() {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("local");
    const [accepted, setAccepted] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [region, setRegion] = useState("");
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const columns = [
        {key: "name", label: "Denumire"},
        {
            key: "status",
            label: "Status",
            render: (value) => (
                <Badge variant="accent" size="sm">
                    {value}
                </Badge>
            ),
        },
    ];

    const avatar = "https://i.pravatar.cc/100";
    const data = [
        {
            id: 1,
            name: "Laptop Dell",
            inventoryNumber: "CEC_1884",
            status: "Activ",
        },
        {
            id: 2,
            name: "Monitor Samsung",
            inventoryNumber: "CEC_1885",
            status: "În stoc",
        },
    ];
    const [date, setDate] = useState("2025-01-11");
    const [files, setFiles] = useState([]);
    return (
        <>
            <Dropzone
                id="dropzone"
            />
            <FileUpload
                id="attachments"
                multiple
                onChange={(selectedFiles) => {
                    setFiles(selectedFiles);
                }}
            />
            <Button
                onClick={() => {
                    console.log(files);
                }}
            >
                Submit
            </Button>
            <FileUpload
                id="image-upload"
                multiple
                imagePreview
                accept="image/*"
            />
            <FileUpload
                id="document-upload"
                multiple
            />
            <FileUpload
                id="document-upload"
                multiple={false}
            />
            <FileUpload
                id="document-upload"
            />
            <Flag code="md"/>
            <Flag code="ro"/>
            <Flag code="ua"/>
            <Flag code="eu"/>
            <DatePicker
                id="birth-date"
                label="Data nașterii"
                value={date}
                onChange={(isoDate) => setDate(isoDate)}
            />
            <DateInput
                id="birthDate"
                label="Data nașterii"
                // value={birthDate}
                // onChange={(e) => setBirthDate(e.target.value)}
                // helperText="Enter date in DD/MM/YYYY format"
                errorText="Invalid date format"
            />
            <BadgeButton platform="mpay"/>
            <BadgeButton platform="mpass"/>
            <BadgeButton platform="msign"/>
            <BadgeButton platform="mpower"/>
            <BadgeButton platform="mdelivery"/>
            <BadgeButton platform="mpass">
                Intră cu MPass
            </BadgeButton>
            <Banner type="info" showClose={false}>
                Scheduled maintenance today. Some services may be temporarily unavailable.
                <Link variant="white" href="/dashboard">shdkjhfksdf</Link>
            </Banner>
            <Banner
                type="warning"
                variant="subtle"
                title="Atenție"
            >
                Verifică datele înainte de salvare.
            </Banner>
            <Banner
                type="error"
                showClose
                onClose={() => console.log("close")}
            >
                A apărut o eroare.
            </Banner>
            <InfoBox
                title="Confirm your identity"
                action
                actionText="Confirm identity"
                onAction={() => console.log("confirm")}
            >
                Confirmă identitatea pentru a continua.
            </InfoBox>
            <InfoBox
                type="warning"
                title="Atenție"
                showClose
                onClose={() => console.log("close")}
            >
                Verifică datele înainte de salvare.
            </InfoBox>
            <InfoBox
                type="info"
                title="Understanding Your Digital Identity"
                link="/help"
                linkText="Learn more"
            >
                For enhanced security, always use two-factor authentication.
            </InfoBox>
            <InfoBox type="neutral">
                For enhanced security, always use two-factor authentication.
            </InfoBox>
            <InlineMessage size={"small"} variant="destructive">
                Inline message
            </InlineMessage>
            <Avatar src="https://i.pravatar.cc/100" badge={3}/>
            <Avatar src="https://i.pravatar.cc/100" dot/>
            <Avatar initials="EI"/>
            <AvatarStack>
                <Avatar src={avatar}/>
                <Avatar src={avatar}/>
                <Avatar src={avatar}/>
                <Avatar initials="+5"/>
            </AvatarStack>
            <Avatar
                src={avatar}
                size="lg"
                badge={-4}
            />

            <Avatar
                src={avatar}
                size="sm"
            />

            <Avatar
                src={avatar}
                size="md"
            />

            <Avatar
                src={avatar}
                size="lg"
            />

            <Avatar
                src={avatar}
                size="xl"
            />
            <Avatar
                src="https://i.pravatar.cc/100"
            />
            <Chip
                avatar="https://i.pravatar.cc/20"
                closable
            >
                Eugeniu
            </Chip>
            <Chip>
                Utilizatori
            </Chip>
            <Chip selected badge={5}>
                Utilizatori
            </Chip>
            <Chip icon="group">
                Grupuri
            </Chip>
            <StatusTag
                variant="accent"
                appearance="strong"
                // icon=""
            >
                Important
            </StatusTag>
            <StatusTag
                variant="danger"
                appearance="subtle"
                icon="circle-error"
            >
                Eroare
            </StatusTag>
            <TagGroup>
                <StatusTag
                    variant="accent"
                    appearance="strong"
                >
                    Important
                </StatusTag>

                <StatusTag
                    variant="neutral"
                    appearance="subtle"
                >
                    Draft
                </StatusTag>

                <StatusTag
                    variant="success"
                    appearance="subtle"
                >
                    Publicat
                </StatusTag>
            </TagGroup>
            <Spinner/>
            <Spinner size="extra-small"/>
            <Spinner size="small" variant="dark"/>
            <Spinner size="large" variant="light"/>
            <Spinner size="large" variant="light-on-color"/>
            <Spinner size="medium" variant="light-on-color"/>
            <Spinner size="medium" variant="light"/>
            <ToastProvider/>
            <Button
                onClick={() =>
                    toast.success("Salvat cu succes")
                }
            >
                Test Toast
            </Button>
            <Button
                onClick={() =>
                    toast.success({
                        title: "Succes",
                        link: "https://www.example.com",
                        linkText: "Vezi detalii",
                        messages: [
                            "Operațiunea a fost finalizată cu succes."
                        ]
                    })
                }
            >
                Test notify
            </Button>
            <Link href="/dashboard">Dashboard</Link>

            <Link href="/users" size="lg">
                Utilizatori
            </Link>

            <Link href="/settings" variant="strict" underline={false}>
                Setări
            </Link>

            <Link href="/help" size="xs" targetSize="touch">
                Ajutor
            </Link>

            <Link href="/logout" disabled>
                Ieșire
            </Link>
            <Breadcrumbs
                mobile
                items={[
                    {label: "Home", href: "/"},
                    {label: "Library", href: "/library"},
                    {label: "Data"},
                ]}
            />
            <Breadcrumbs
                items={[
                    {label: "Home", href: "/", icon: "home-round-door"},
                    {label: "Projects", href: "/projects"},
                    {label: "Design System"},
                ]}
                withIcon
            />
            <Button>Button</Button>

            <Button color="secondary">Button</Button>

            <Button variant="outline" color="primary">
                Primary
            </Button>
            <Button variant="text" color="destructive">
                Șterge
            </Button>
            <Button size="sm">Small</Button>
            <Button size="lg" rounded>
                Large
            </Button>
            <Button loading color="secondary"/>
            <Button leadingIcon={<Icon name="plus-small"/>}>Adaugă</Button>
            <Button trailingIcon={<Icon name="chevron-bottom"/>}>Filtre</Button>
            <Input id="name" label="Nume" placeholder="Introduceți numele"/>
            <Input
                id="search"
                label="Căutare"
                placeholder="Caută..."
                leadingIcon="search"
            />
            <Input
                id="select-like"
                label="Raion"
                placeholder="Alege raionul"
                trailingIcon="chevron-bottom"
            />
            <Input
                id="email"
                label="Email"
                status="destructive"
                message="Email invalid"
            />
            <Input
                label="Emailajsdkfghsjdgfkjhsgdjfhgkjsdgfjkh"
                errorText="Adresa de email este invalidă"
            />
            <Input
                label="Emailajsdkfghsjdgfkjhsgdjfhgkjsdgfjkh"
                errorText="Adresa de email este invalidă"
            />
            <Input
                label="Emailajsdkfghsjdgfkjhsgdjfhgkjsdgfjkh"
                errorText="Adresa de email este invalidă"
            />
            <Input
                label="Emailajsdkfghsjdgfkjhsgdjfhgkjsdgfjkh"
                errorText="Adresa de email este invalidă"
                message="Email invalid"
            />
            <Input
                label="Email"
                status="destructive"
                message="Email invalid"
            />
            <Input
                label="Data"
                status="warning"
                message="Verifică formatul datei"
            />
            <Input
                label="Nume"
                status="success"
                message="Datele sunt valide"
            />
            <Textarea
                label="Comentariu"
                status="destructive"
                message="Acest câmp este obligatoriu"
            />
            <Textarea
                label="Descriere"
                status="warning"
                message="Limita de caractere este aproape de a fi atinsă"
                showCounter
                maxLength={200}/>


            <SearchInput
                id="global-search"
                label="Căutare"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch("")}
                onSearch={(value) => console.log(value)}
            />
            <SearchInput
                id="search"
                shape="circular"
                size="medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClear={() => setSearch("")}
            />
            <Radio
                id="type-local"
                name="type"
                value="local"
                checked={type === "local"}
                onChange={(e) => setType(e.target.value)}
                label="Local"
                description="Pentru utilizatori locali"
            />

            <Radio
                id="type-international"
                name="type"
                value="international"
                checked={type === "international"}
                onChange={(e) => setType(e.target.value)}
                label="Internațional"
                description="Pentru utilizatori din afara țării"
            />
            <Radio
                id="small-radio"
                name="size"
                value="small"
                size="small"
                label="Small option"
            />
            <Radio
                id="error-radio"
                name="option"
                value="1"
                error
                label="Opțiune invalidă"
                description="Trebuie selectată altă valoare"
            />
            <Checkbox
                label="Accept termenii"
            />
            <Checkbox
                checked={accepted}
                onChange={(e) =>
                    setAccepted(e.target.checked)
                }
                label="Accept termenii"
            />
            <Checkbox
                label="Notificări"
                description="Primește notificări pe email"
            />
            <Checkbox
                error
                label="Accept termenii"
            />
            <Checkbox
                indeterminate
                label="Selectează toate"
            />
            <Switch
                id="notifications"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                label="Notificări"
                description="Activează notificările sonore"
            />
            <Switch
                id="dark-mode"
                size="small"
                label="Dark mode"
            />
            <Switch
                id="required-setting"
                error
                label="Setare obligatorie"
            />

            <Select
                id="region"
                label="Raion"
                placeholder="Selectați raionul"
                value={region}
                onChange={setRegion}
                options={[
                    {
                        value: "chisinau",
                        label: "ChișinaskbChișinaskChișinaskbfdjkhasvdfkgaksjhgdfkjhgasdjkhfgkjashgdfkjgasjkdgfkjsgdafkjgsdkjgfjksagfdskjhgfăubfdjkhasvdfkgaksjhgdfkjhgasdjkhfgkjashgdfkjgasjkdgfkjsgdafkjgsdkjgfjksagfdskjhgfăufdjkhasvdfkgaksjhgdfkjhgasdjkhfgkjashgdfkjgasjkdgfkjsgdafkjgsdkjgfjksagfdskjhgfău"
                    },
                    {value: "balti", label: "Bălți"},
                    {value: "cahul", label: "Cahul"},
                ]}
            />
            <Select
                id="region"
                label="Raion"
                value={region}
                disabled={true}
                onChange={setRegion}
                options={[
                    {
                        value: "chisinau",
                        label: "Chișinaskbfdjkhasvdfkgaksjhgdfkjhgasdjkhfgkjashgdfkjgasjkdgfkjsgdafkjgsdkjgfjksagfdskjhgfău"
                    },
                    {value: "balti", label: "Bălți"},
                    {value: "cahul", label: "Cahul"},
                ]}
                status="destructive"
                message="Selectați un raion"
                messageType="error"
            />
            <Badge>1</Badge>
            <Badge variant="dark" size="lg">
                12
            </Badge>
            <Badge variant="notification" size="sm">
                5
            </Badge>
            <Badge variant="neutral" size="sm">
                1K+
            </Badge>
            <Badge variant="neutral">Draft</Badge>
            <Badge variant="accent">Activ</Badge>
            <Badge variant="notification">3</Badge>
            <Table
                columns={columns}
                data={data}
                variant="subtle"
            />
            <Pagination
                currentPage={page}
                totalPages={27}
                onPageChange={setPage}
            />
            <Pagination
                currentPage={page}
                totalPages={27}
                onPageChange={setPage}
                compact
                maxSlots={5}
            />

            <Button onClick={() => setOpen(true)}>
                Deschide modal
            </Button>

            {/*<Modal*/}
            {/*    open={open}*/}
            {/*    onClose={() => setOpen(false)}*/}
            {/*    title="Confirm Action"*/}
            {/*    confirmText="Confirm & Proceed"*/}
            {/*    cancelText="Cancel"*/}
            {/*    onConfirm={() => {*/}
            {/*        console.log("confirmed");*/}
            {/*        setOpen(false);*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <p className="modal-text">*/}
            {/*        You are about to proceed with this action.*/}
            {/*    </p>*/}
            {/*</Modal>*/}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Ștergere"
                confirmText="Confirm & Delete"
                cancelText="Cancel"
                destructive
            >
                <p className="modal-text">
                    Această acțiune nu poate fi anulată.
                </p>
            </Modal>
            <Tabs
                tabs={[
                    {
                        value: "general",
                        label: "General",
                        icon: "page-text",
                        content: <div>Conținut General</div>,
                    },
                    {
                        value: "users",
                        label: "Utilizatori",
                        badge: 3,
                        content: <div>Conținut Utilizatori</div>,
                    },
                ]}
            />
            <Accordion
                items={[
                    {
                        value: "general",
                        title: "Accordion Heading",
                        supportingText: "Supporting Text",
                        content: (
                            <p>
                                Conținutul accordionului. Poate fi text, liste, componente etc.
                            </p>
                        ),
                    },
                    {
                        value: "details",
                        title: "Detalii",
                        supportingText: "Mai multe informații",
                        content: <div>Conținut detaliat</div>,
                    },
                ]}
            />
            {/*<CookieBanner*/}
            {/*    onAcceptAll={() => console.log("all")}*/}
            {/*    onAcceptNecessary={() => console.log("necessary")}*/}
            {/*    onConfirm={(prefs) => console.log(prefs)}*/}
            {/*/>*/}
            <Tooltip content="Tooltip displayed above the element." placement="top">
                <Button color="primary">
                    Hover me
                </Button>
            </Tooltip>
            <Tooltip content="Informație suplimentară" placement="top-center">
              <span className="mud-inline-flex">
                <Icon name="circle-error" size="sm"/>
              </span>
            </Tooltip>
            <Footer
                brand={{
                    logo: mpayLogo,
                    logoAlt: "MPay logo",
                    title: "mpay",
                    description: "serviciul guvernamental de plăți electronice",
                    extraDescription: "EVO simplifică relația ta cu statul și serviciile publice.",
                }}
                contacts={[
                    {
                        icon: "phone",
                        label: "0 (22) 820 000",
                        href: "tel:022820000",
                    },
                    {
                        icon: "envelope",
                        label: "suport.mpay@gov.md",
                        href: "mailto:suport.mpay@gov.md",
                    },
                ]}
                navigation={[
                    {
                        title: "Platformă",
                        links: [
                            {label: "Acasă", href: "/"},
                            {label: "Servicii", href: "/services"},
                            {label: "Ajutor", href: "/help"},
                        ],
                    },
                    {
                        title: "Informații",
                        links: [
                            {label: "Despre", href: "/about"},
                            {label: "Contacte", href: "/contacts"},
                        ],
                    },
                ]}
                payments={[
                    {src: mastercardLogo, alt: "Mastercard"},
                    {src: visaLogo, alt: "Visa"},
                ]}
                apps={[
                    {
                        href: "#",
                        label: "Descarcă din App Store",
                        src: appstoreBadge,
                    },
                    {
                        href: "#",
                        label: "Descarcă din Google Play",
                        src: playmarketBadge,
                    },
                ]}
                logos={[
                    {
                        href: "#",
                        src: ageLogo,
                        alt: "Agenția de Guvernare Electronică",
                    },
                    {
                        href: "#",
                        src: govLogo,
                        alt: "Guvernul Republicii Moldova",
                    },
                ]}
                socials={[
                    {type: "facebook", label: "Facebook", href: "#"},
                    {type: "instagram", label: "Instagram", href: "#"},
                    {type: "youtube", label: "YouTube", href: "#"},
                    {type: "linkedin", label: "LinkedIn", href: "#"},
                ]}
                legalLinks={[
                    {label: "Termeni și condiții", href: "#"},
                    {label: "Politica de confidențialitate", href: "#"},
                ]}
                copyright="© 2026 Agenția de Guvernare Electronică. Toate drepturile rezervate."
            />
        </>
    )
}

export default App
