import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Download, Github } from 'lucide-react';

const home = `${process.env.PUBLIC_URL}/`;
const resume = `${process.env.PUBLIC_URL}/Saiashok-Karadi-CV.pdf`;

const cases = {
  cabs: {
    index: '01 / SECURITY INFRASTRUCTURE',
    title: 'Making network operations visible and faster to act on.',
    subtitle: 'A firewall gateway, observability stack and management dashboard built during a project internship at CABS, DRDO.',
    role: 'Project Intern',
    period: 'February - May 2026',
    stack: 'Alpine Linux / iptables / ipset / Wazuh / Docker / FastAPI / D3.js',
    challenge: 'Firewall rules, network traffic and alerts needed a more direct operational view. The work joined gateway enforcement, centralised observability and rule deployment in one workflow.',
    decisions: [
      { title: 'Keep enforcement close to the kernel', text: 'Used iptables and ipset on an Alpine Linux gateway for IP blocking, port filtering and GeoIP based access control. Hash sets reduced rule set complexity as the CIDR list grew.' },
      { title: 'Separate collection from action', text: 'Deployed Wazuh Manager, OpenSearch and the Dashboard as a three container stack for log aggregation and alert triage. A FastAPI backend and D3.js interface handled rule deployment and traffic visibility.' },
      { title: 'Design for an operator’s next step', text: 'Brought rule changes, traffic signals and alerts into a single management view, so the interface supported a decision instead of only displaying data.' },
    ],
    outcome: 'The CV reports 70% less rule deployment turnaround, 90% less manual operational overhead and 60% better monitoring coverage. These are project reported results, not independently audited benchmarks.',
  },
  tile: {
    index: '02 / OPEN SOURCE MACOS APP',
    title: 'A terminal workspace that keeps the work in view.',
    subtitle: 'Tile is an open source macOS app with up to four live shells per workspace and pane movement between windows without restarting a process.',
    role: 'Open source project',
    period: 'Public preview release',
    stack: 'Swift / macOS / SwiftTerm',
    challenge: 'Multiple terminal sessions are easier to manage when their state and layout stay visible. Tile focuses on pane navigation, movement and restoration across workspaces and windows.',
    decisions: [
      { title: 'Keep sessions live during movement', text: 'A terminal can move between windows without its running process restarting. Keyboard navigation and pane actions work independently of drag and drop.' },
      { title: 'Separate terminal emulation from workspace logic', text: 'SwiftTerm provides the terminal emulator. Tile owns the workspace and window behaviour around it, including pane order, split sizes and selected sessions.' },
      { title: 'Restore a useful starting point', text: 'Window layout, pane names and working directories return after relaunch. Restored panes start fresh shells, so the interface does not imply that old processes continue.' },
    ],
    outcome: 'The source, local build checks and an Apple Silicon preview release are public. The interaction model below is based on the project README; the artwork is from the Tile repository.',
  },
};

function EvidenceVisual({ slug }) {
  if (slug === 'cabs') return <figure className="case-visual case-system-map">
    <div className="case-system-grid" role="img" aria-label="System map: Alpine gateway enforces firewall rules, FastAPI and D3.js manage rules and traffic, and Wazuh Manager, OpenSearch and Dashboard support observability">
      <div className="case-system-box"><small>01 / ENFORCE</small><strong>Alpine gateway</strong><span>iptables · ipset · GeoIP</span></div>
      <div className="case-system-link" aria-hidden="true" />
      <div className="case-system-box"><small>02 / OPERATE</small><strong>Management dashboard</strong><span>FastAPI · D3.js</span></div>
      <div className="case-system-link" aria-hidden="true" />
      <div className="case-system-box"><small>03 / OBSERVE</small><strong>Wazuh stack</strong><span>Manager · OpenSearch · Dashboard</span></div>
    </div>
    <figcaption>System map reconstructed from the CV. It explains the components and their roles; it is not a product screenshot.</figcaption>
  </figure>;
  return <figure className="case-visual case-tile-evidence">
    <img src={`${process.env.PUBLIC_URL}/tile-logo.png`} width="900" height="491" alt="Tile terminal workspace artwork from the project repository" />
    <div className="case-tile-model" role="img" aria-label="Diagram of four terminal panes in a Tile workspace"><span /><span /><span /><span /></div>
    <figcaption>Repository artwork and a four pane interface diagram based on the Tile README. The diagram is not an app screenshot.</figcaption>
  </figure>;
}

export default function CaseStudy({ slug }) {
  const item = cases[slug];
  useEffect(() => { document.title = `${slug === 'cabs' ? 'CABS infrastructure' : 'Tile workspace'} | Saiashok Karadi`; }, [slug]);
  return <div className="site-shell case-shell" id="top">
    <header className="site-header"><div className="header-inner"><a className="wordmark" href={home} aria-label="Saiashok Karadi, portfolio home">SK<span className="wordmark-dot">.</span></a><a className="case-back-header" href={`${home}#work`}><ArrowLeft size={17} /> All projects</a><a className="header-availability" href="mailto:saiashok103@gmail.com"><span className="availability-dot" /> Open to opportunities <ArrowUpRight size={15} /></a></div></header>
    <main>
      <section className="case-hero section-wrap"><a className="case-back" href={`${home}#work`}><ArrowLeft size={17} /> Back to work</a><span className="section-index">{item.index}</span><h1>{item.title}</h1><p className="case-subtitle">{item.subtitle}</p><div className="case-facts"><div><span>ROLE</span><strong>{item.role}</strong></div><div><span>WHEN</span><strong>{item.period}</strong></div><div><span>TOOLS</span><strong>{item.stack}</strong></div></div></section>
      <section className="section-wrap case-evidence" aria-label="Project visual"><EvidenceVisual slug={slug} /></section>
      <section className="case-body section-wrap"><div className="case-challenge"><span className="section-index">THE PROBLEM</span><h2>What needed to work</h2><p>{item.challenge}</p></div><div className="case-decisions"><span className="section-index">THE APPROACH</span><h2>Decisions behind the build</h2><div className="case-decision-list">{item.decisions.map((decision, index) => <article key={decision.title}><span>0{index + 1}</span><div><h3>{decision.title}</h3><p>{decision.text}</p></div></article>)}</div></div><div className="case-outcome"><span className="section-index">THE RESULT</span><h2>What the work shows</h2><p>{item.outcome}</p></div><div className="case-links"><a className="button button-dark" href={slug === 'tile' ? 'https://github.com/saiashok0981/tile' : resume} target="_blank" rel="noopener noreferrer">{slug === 'tile' ? <Github size={18} /> : <Download size={18} />}{slug === 'tile' ? 'View Tile source' : 'Read supporting CV'}</a>{slug === 'tile' && <a className="text-link" href="https://saiashok0981.github.io/tile/" target="_blank" rel="noopener noreferrer">Tile preview release <ArrowUpRight size={17} /></a>}</div></section>
      <nav className="case-next section-wrap" aria-label="More work"><span>KEEP EXPLORING</span><a href={`${home}?case=${slug === 'cabs' ? 'tile' : 'cabs'}`}>{slug === 'cabs' ? 'Tile terminal workspace' : 'CABS infrastructure'} <ArrowUpRight size={20} /></a></nav>
    </main>
    <footer className="site-footer section-wrap"><span>© {new Date().getFullYear()} SAIASHOK KARADI</span><a href={home}>BACK TO PORTFOLIO ↑</a></footer>
  </div>;
}
