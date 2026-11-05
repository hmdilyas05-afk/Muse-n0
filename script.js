const productContainer = document.getElementById("productContainer");
fetch(
  "https://js-dynamic-portfolio-data-makerslab-emlyon-cdweb-8f83155c64a0cc.gitlab.io/json/sneakers.json"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const heroContent = document.createElement("div");
    heroContent.classList.add("heroContent");

    // nomCommercial
    const nomCommercial = document.createElement("h1");
    nomCommercial.textContent = data.nomCommercial;
    console.log(nomCommercial);

    // phraseAccroche
    const phraseAccroche = document.createElement("h2");
    phraseAccroche.textContent = data.phraseAccroche;
    console.log(phraseAccroche);

    const outSpe = document.createElement("div");
    outSpe.classList.add("outSpe");
    // texteAppelAction
    const texteAppelAction = document.createElement("h3");
    texteAppelAction.textContent = data.texteAppelAction;
    console.log(texteAppelAction);

    // bouton meme si je sais pas a quoi sa sert.
    const btn = document.createElement("button");
    btn.classList.add("bouton");
    btn.textContent = "Acheter une paire";

    // avantagesClients
    const outAvantagesClient = document.createElement("div");
    outAvantagesClient.classList.add("avantage");
    const avantagesClients = data.avantagesClients;
    avantagesClients.forEach((element) => {
      const image = document.createElement("img");
      image.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#ff8f1f" viewBox="0 0 256 256"><path d="M231.16,166.63l-28.63-14.31A47.74,47.74,0,0,1,176,109.39V80a8,8,0,0,0-8-8,48.05,48.05,0,0,1-48-48,8,8,0,0,0-12.83-6.37L30.13,76l-.2.16a16,16,0,0,0-1.24,23.75L142.4,213.66a8,8,0,0,0,5.66,2.34H224a16,16,0,0,0,16-16V180.94A15.92,15.92,0,0,0,231.16,166.63ZM224,200H151.37L40,88.63l12.87-9.76,38.79,38.79A8,8,0,0,0,103,106.34L65.74,69.11l40-30.31A64.15,64.15,0,0,0,160,87.5v21.89a63.65,63.65,0,0,0,35.38,57.24L224,180.94ZM70.8,184H32a8,8,0,0,1,0-16H70.8a8,8,0,1,1,0,16Zm40,24a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16h54.8A8,8,0,0,1,110.8,208Z"></path></svg>`;

      const paraAvantagesClients = document.createElement("h4");
      paraAvantagesClients.textContent = element;
      
      outAvantagesClient.appendChild(paraAvantagesClients);
      outAvantagesClient.appendChild(image)
    });

    // produits

    const backOutProduits = document.createElement("div");
    backOutProduits.classList.add("grosProduit");
    backOutProduits.id= "pro";
    
    const produits = data.produits;
    produits.forEach((element) => {
      const outProduits = document.createElement("div");
      outProduits.classList.add("produit");

      const imageUrl = document.createElement("img");
      imageUrl.src = element["image-url"];
      imageUrl.alt = element.nom;

      const nom = document.createElement("h5");
      nom.textContent = element.nom;

      const description = document.createElement("p");
      description.textContent = element.description;

      outProduits.appendChild(imageUrl);
      outProduits.appendChild(nom);
      outProduits.appendChild(description);

      backOutProduits.appendChild(outProduits);
    });

    //service
    const backOutServices = document.createElement("div");
    backOutServices.classList.add("grosProduit");
    backOutServices.id= "ser";

    const services = data.services;
    services.forEach((element) => {
      const outServices = document.createElement("div");
      outServices.classList.add("service");

      const nom = document.createElement("h5");
      nom.textContent = element.nom;

      const description = document.createElement("p");
      description.textContent = element.description;

      outServices.appendChild(nom);
      outServices.appendChild(description);

      backOutServices.appendChild(outServices);
    });

    // temoignages
    const backOuttemoignages = document.createElement("div");
    backOuttemoignages.classList.add("grosProduit");
    backOuttemoignages.id= "tem";

    const temoignages = data.temoignages;
    temoignages.forEach((element) => {
      const outtemoignages = document.createElement("div");
      outtemoignages.classList.add("temoignage");

      const prenom = document.createElement("h5");
      prenom.textContent = `${element.prenom}`;

      const note = document.createElement("h6");
      note.textContent = `${element.note}/5`;

      const typeExperience = document.createElement("h5");
      typeExperience.textContent = `${element.typeExperience}`;

      const commentaire = document.createElement("p");
      commentaire.textContent = `commentaire : ${element.commentaire}`;

      outtemoignages.appendChild(prenom);
      outtemoignages.appendChild(note);
      outtemoignages.appendChild(typeExperience);
      outtemoignages.appendChild(commentaire);

      backOuttemoignages.appendChild(outtemoignages);
    });

    // outSpe.appendChild(texteAppelAction);
    heroContent.appendChild(outSpe);
    heroContent.appendChild(nomCommercial);
    heroContent.appendChild(phraseAccroche);
    heroContent.appendChild(texteAppelAction);
    heroContent.appendChild(outAvantagesClient);
    heroContent.appendChild(btn);
    productContainer.appendChild(heroContent);
    productContainer.appendChild(backOutProduits);
    productContainer.appendChild(backOutServices);
    productContainer.appendChild(backOuttemoignages);
  });
