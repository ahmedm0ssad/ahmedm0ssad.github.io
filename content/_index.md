---
# Leave the homepage title empty to use the site title
title: ''
summary: ''
date: 2026-01-01
type: landing

design:
  # Default section spacing (matches reference design)
  spacing: '2rem'

# Page sections
sections:

  #############################
  ########## About ############
  #############################
  - block: resume-biography-3
    id: about
    content:
      username: me
      text: ''
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      avatar:
        shape: rounded # circle | square | rounded
        size: large    # small | medium | large | xl | xxl
      background:
        color: Gainsboro
      biography:
        style: 'text-align: justify; font-size: 1em;'

  #############################
  ######## Certifications #####
  #############################
  - block: resume-awards
    id: certifications
    content:
      title: Certifications
      username: me
    design:
      date_format: January 2006
      background:
        color: LightGrey

  #############################
  ######### Experience ########
  #############################
  - block: resume-experience
    id: experience
    content:
      username: me
      text: ''
    design:
      background:
        color: Gainsboro

  #############################
  ########## Skills ###########
  #############################
  - block: resume-skills
    id: skills
    content:
      username: me
      title: 'Skills & Hobbies'
    design:
      show_skill_percentage: false
      background:
        color: LightGrey

  #############################
  ######### Projects ##########
  #############################
  - block: portfolio
    id: projects
    content:
      title: Projects
      count: 0 # Show all projects
      filters:
        folders:
          - projects
      buttons:
        - name: All
          tag: '*'
        - name: AI / LLM / RAG
          tag: 'AI / LLM / RAG'
        - name: Deep Learning / Computer Vision
          tag: 'Deep Learning / Computer Vision'
        - name: Big Data & Distributed Systems
          tag: 'Big Data & Distributed Systems'
        - name: Full-Stack / Software Engineering
          tag: 'Full-Stack / Software Engineering'
        - name: MLOps
          tag: MLOps
      default_button_index: 0
    design:
      columns: 3
      fallback_icon: code-bracket
      background:
        color: Gainsboro

  #############################
  ######### Contact ###########
  #############################
  - block: contact-info
    id: contact
    content:
      title: Contact
      address:
        lines:
          - Giza, Egypt
      email: ahmed.abdelfattah.mossad@gmail.com
      phone: '+20 102 963 8868'
      social:
        - icon: brands/github
          url: https://github.com/ahmedm0ssad
        - icon: brands/linkedin
          url: https://linkedin.com/in/ahmed-mossad-4528202b2
    design:
      background:
        color: LightGrey

  #############################
  ########## Stats ############
  #############################
  - block: stats
    id: stats
    content:
      title: By the Numbers
      items:
        - statistic: '56'
          description: Projects
          icon: hero/code-bracket
        - statistic: '10'
          description: Roles & Activities
          icon: hero/briefcase
        - statistic: '12'
          description: Skill Domains
          icon: hero/cpu-chip
        - statistic: '3'
          description: Certifications
          icon: hero/trophy
    design:
      layout: cards
      background:
        color: Gainsboro
---
