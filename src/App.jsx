import Button from "./components/ui/Button/Button.js";
import Icon from "./components/ui/Icon/Icon.js";
import Input from "./components/ui/Input/Input.jsx";
import Textarea from "./components/ui/Textarea/Textarea.jsx";
import {useState} from "react";
import SearchInput from "./components/ui/Input/SearchInput.jsx";
import Radio from "./components/ui/Button/Radio.jsx";
import Checkbox from "./components/ui/Button/Checkbox.jsx";
import Switch from "./components/ui/Button/Switch.jsx";
import Select from "./components/ui/Select/Select.jsx";
function App() {
     const [search, setSearch] = useState("");
     const [type, setType] = useState("local");
     const [accepted, setAccepted] = useState(false);
     const [notifications, setNotifications] = useState(true);
     const [region, setRegion] = useState("");
  return (
    <>
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
      <Button loading color="secondary" />
      <Button leadingIcon={<Icon name="plus-small" />}>Adaugă</Button>
      <Button trailingIcon={<Icon name="chevron-bottom" />}>Filtre</Button>
      <Input id="name" label="Nume" placeholder="Introduceți numele" />
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
            { value: "chisinau", label: "ChișinaskbChișinaskChișinaskbfdjkhasvdfkgaksjhgdfkjhgasdjkhfgkjashgdfkjgasjkdgfkjsgdafkjgsdkjgfjksagfdskjhgfăubfdjkhasvdfkgaksjhgdfkjhgasdjkhfgkjashgdfkjgasjkdgfkjsgdafkjgsdkjgfjksagfdskjhgfăufdjkhasvdfkgaksjhgdfkjhgasdjkhfgkjashgdfkjgasjkdgfkjsgdafkjgsdkjgfjksagfdskjhgfău" },
            { value: "balti", label: "Bălți" },
            { value: "cahul", label: "Cahul" },
          ]}
        />
        <Select
          id="region"
          label="Raion"
          value={region}
          disabled={true}
          onChange={setRegion}
          options={[
            { value: "chisinau", label: "Chișinaskbfdjkhasvdfkgaksjhgdfkjhgasdjkhfgkjashgdfkjgasjkdgfkjsgdafkjgsdkjgfjksagfdskjhgfău" },
            { value: "balti", label: "Bălți" },
            { value: "cahul", label: "Cahul" },
          ]}
          status="destructive"
          message="Selectați un raion"
          messageType="error"
        />
    </>
  )
}

export default App
