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

import barbarian from "../images/warrior2.png";
import elf from "../images/elf.png";
import mage from "../images/mage.png";
import dwarf from "../images/dwarf_right.png"

const Header = ({ title, children  }) => (
  <div className="header-section">
    <h1 className="header">{title}</h1>
    <div className="section-content">{children}</div>
  </div>
  );
  

const ImageRow = ({images}) => {
    return (<div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '24px'
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

const Image = ({image, title}) => (
  <img className="image" src={image.src} style={{width: image.scale, height: image.scale}} alt={title} />
)

const SubSection = ({ title, content, visualContent }) => (
  <div >
    <div className="subsection-content"> 
    <div className="subsection-text">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
    {visualContent}
    </div>



  </div>
);

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

const tokenImages = [ 
  {path: dwarf, backgroundColor: "orange" },
  {path: barbarian, backgroundColor: "yellow" },
  {path: elf, backgroundColor: "green" },
  {path: mage, backgroundColor: "purple" }
]

const TutorialPage = () => (
<div className="tutorial-page">
  <Header title="Welcome to Magic Maze Online">
    Play with up to 3 friends to explore the maze, find weapons, steal them, and escape before time runs out.
  </Header>
    <Section title="Controls" image={{src: controls, scale: "33%"}}>
      <SubSection title="Select Characters" content="Press 'Q' to switch characters or click on a character." />
      <SubSection title="Basic Movement" content={
      <div>
      <p>Press 'W' to move Up</p>
      <p>Press 'A' to move Left</p>
      <p>Press 'S' to move Down</p>
      <p>Press 'D' to move Right</p>
      </div>}/>
      <SubSection title="Stairs" content="Press 'E' to traverse up or down stairs." />
      <SubSection title="Portals" content="Press 'E' to toggle through available portals. Press Enter/Return to teleport to a selected portal." />
    </Section>
    <Section title="Communication">
      <p>Use voice/video tech like Zoom, or Discord. For a challenge only talk after picking up an hourglass timer.</p>
    </Section>
    <Section title="Gameplay">
      <SubSection title="Color Coding" content="Each character has tiles or items available only to them, matched by color" visualContent={<ImageRow images={tokenImages}/>}/>
      <SubSection title="Exploring" content="Navigate to exploration tiles to reveal new sections." visualContent={<ImageRow images={explorationImages}/>}/>
      <SubSection title="Weapons" content="Steal weapons after exploring all sections and standing on weapon tiles." visualContent={<ImageRow images={weaponImages}/>}/>
      <SubSection title="Escaping" content="Get to the exit tiles before time runs out." visualContent={<ImageRow images={exitImages}/>}/>
      <SubSection title="Teleportation Portals" content="Teleport to matching colors using portals." visualContent={<ImageRow images={portalImages}/>} />
      <SubSection title="Timers" content="Pick up hourglass timers to flip the timer." visualContent={<Image title="Timers" image={{src: timerImg, scale: "128px"}}/>}  />
    </Section>

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
