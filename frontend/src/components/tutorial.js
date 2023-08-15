import React from 'react'
import controls from "../images/moves.png"
import ImageGrid from "./tempColorGrid"
import connection from "../images/up.png";
import exit from "../images/s1.png";
import timerImg from "../images/timer.png"

import orangePortal from "../images/orange-portal.png"
import yellowPortal from "../images/yellow-portal.png"
import greenPortal from "../images/green-portal.png"
import purplePortal from "../images/purple-portal.png"

import axe from "../images/axe2.png";
import sword from "../images/sword.png";
import bow from "../images/arrows2.png";
import potion from "../images/potion.png";

const Header = ({ title }) => (
    <h1 className="header">{title}</h1>
  );
  

const ImageRow = ({images}) => {
    console.log(images)
    return (<div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px'
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              width: '64px',
              height: '64px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              backgroundColor: image.backgroundColor
            }}
          >
            <img src={image.path} alt="grid" style={{ maxWidth: '75%', maxHeight: '75%' }} />
          </div>
        ))}
      </div>)
}
const Section = ({ title, children, image }) => (
<div className="section">
    <h2 className="section-title">{title}</h2>
    <div className = "content-container">
        <div className="section-content">{children}</div>
        {image && <img className="image" src={image.src} style={{width: image.scale, height: image.scale}} alt={title} />}
    </div>

</div>
);

const TempSection = ({ title, children, visualContent }) => (
    <div className="section">
        <h2 className="section-title">{title}</h2>
        <div className = "content-container">
            <div className="section-content">{children}</div>
            {visualContent}
        </div>
    
    </div>
    );

const explorationImages = [
    {path: connection, backgroundColor: "orange" },
    {path: connection, backgroundColor: "yellow" },
    {path: connection, backgroundColor: "green" },
    {path: connection, backgroundColor: "purple" },
]

const exitImages = [
    {path: exit, backgroundColor: "orange" },
    {path: exit, backgroundColor: "yellow" },
    {path: exit, backgroundColor: "green" },
    {path: exit, backgroundColor: "purple" },
]

const portalImages = [
    {path: orangePortal, backgroundColor: "orange" },
{path: yellowPortal, backgroundColor: "yellow" },
{path: greenPortal, backgroundColor: "green" },
{path: purplePortal, backgroundColor: "purple" }]

const weaponImages = [
    {path: axe, backgroundColor: "orange" },
{path: sword, backgroundColor: "yellow" },
{path: bow, backgroundColor: "green" },
{path: potion, backgroundColor: "purple" },
]

const TutorialPage = () => (
<div className="tutorial-page">
<Header title="Welcome to Magic Maze Online" />
    <Section title="Controls" image={{src: controls, scale: "33%"}}>
      <p>You can control any and every character with the moves that you are allowed. You can see your allowed moves in the sidebar, as well as the moves that your fellow players can do.</p>
      <p>To start you can select a character using either Q to cycle selection of the characters or click on a specific character that you want to control.</p>
      <p>There are multiple available moves: move up, move down, move left, move right, use the stairs, or teleport to any matching portal. You will have to coordinate with your teammates in order to move the characters where they need to go. In your first rounds of playing you can converse to each other using a voice/video technology like Zoom, Discord, Facetime or similar, but after you have gotten the hang of the game you will only be able to discuss amongst yourself after you pick up an hourglass timer, but only until the first person makes the next move.</p>
    </Section>
    <TempSection title="Color Coding" visualContent={<ImageGrid/>}>
      <p>Each player character has items or action tiles that correspond only to them, you can find them by matching colors. The Dwarf character corresponds to all tiles/items with an orange background, the Barbarian character corresponds to yellow, the Mage to purple, and the Elf to green. If a tile is color-coded to a character, no other character can use that tile.</p>
    </TempSection>
    <TempSection title="Exploring" visualContent={<ImageRow images={explorationImages}/>}>
      <p>To explore the maze and reveal new tiles, the character tokens have to be navigated to the exploration tiles, these can be found at the edge of the existing maze sections and have arrows pointing outwards. Each exploration tile is also color-coded to a specific character.</p>
    </TempSection>
    <TempSection title="Weapons" visualContent={<ImageRow images={weaponImages}/>}>
      <p>Each character has one specific weapon that they want to steal. There are two conditions before a weapon can be stolen: the sections have to all be explored, and all the characters have to be simultaneously standing on their weapon tiles.</p>
    </TempSection>
    <TempSection title="Escaping"  visualContent={<ImageRow images={exitImages}/>}>
      <p>Each character has their own color-coded exit tile that they need to get to before time runs out, this occurs after the weapon stealing phase. After the weapons have been stolen, the teleportation tiles are disabled however, making it a race to the finish.</p>
    </TempSection>
    <Section title="Timers" image={{src: timerImg, scale: "20%"}}>
      <p>The hourglass timers when picked up flip the timer. This means that the less time remaining when you pick up an hourglass, the more time you will have remaining afterwards. Example: when I pick up the timer with 5 seconds left, I will now have 1 min 55 seconds remaining; when I pick up the timer with 1:50 seconds left, I will now have 10 seconds remaining.</p>
    </Section>
    <TempSection title="Teleportation Portals" visualContent={<ImageRow images={portalImages}/>}>
      <p>A teleportation portal allows character tokens to teleport to any matching colors, but only the character that matches the color-coding can use this portal. Press E to toggle the selected destination portal, press Return/Enter in order to teleport to the selected portal.</p>
    </TempSection>
    <div className="conclusion">
      <p>Enjoy playing Magic Maze Online with your friends and explore the maze together!</p>
    </div>
</div>
);

function Tutorial({playerName, setPlayerName}) {

  return (
    <div className="tutorial">
      <h1 className='gameTitle'> Magic Maze</h1>
      <div className="tutorial-content">
        <TutorialPage/>
      </div>
    </div>
  );
}

export default Tutorial;
