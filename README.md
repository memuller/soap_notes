# SOAP Notes App

This application is a simple SOAP note-taker.

It's _not_ production-ready.

## About SOAP

__[SOAP](https://en.wikipedia.org/wiki/SOAP_note)__ stands for __Subjective__, __Objective__, __Assessment__, __Plan__. It's a documentation style widely used by health care providers to write notes about patients.

More than mere documentation, SOAP outlines how assessment of clinical situations should be performed, and enforces important criteria like the need for diferential diagnosis.

### An example

A sample note from a general clinic:

#### Subjective

2 year old female, mother relates drainage from both eyes for last two days. drainage apparent; mild congestion.
mother relates absence of fever, vomiting or diarrhea, and normal feeding.
immunization is up to date.

#### Objective

vitals normal, no fever, weight within parameters.
patient cries upon exam but easily calmed down.

conjuctivae injected with bilateral exudates, exoriated from drainage on left eyelid. redded and dull.
rhinorrhea, purulent nasal drainage

pharynx negative, neck supple, lungs clear
abdominal unremarkable
no rash

#### Assessment

1. Bilateral conjuctivitis, infectious
2. Bilateral otitis media, chronic/acute unknown.

#### Plan

* Antibiotic eye drops, 2 drops each 3 times day for 7 days; Besifloxacin
* Return exam in 7-10 days.
* Child should be kept away from daycare and social contact until return exam.

## This App

Type out the name of a Patient to create it (or access it, if you already have notes on it); them type out the four SOAP fields. Notes are stored and can be searched by Patient name. Notes can't be edited.

The application is build using Angular; data is stored in browser's LocalStorage.
