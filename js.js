document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");
  const galleryContainer = document.getElementById("gallery-container");
  const folderToggle = document.getElementById("toggle-folder");
  const catalogFolder = document.getElementById("catalog-folder");
  const searchInput = document.getElementById("search-input");
  const uploadForm = document.getElementById("upload-form");
  const productModal = document.getElementById("product-modal");
  const closeModal = productModal?.querySelector(".close-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalWaBtn = document.getElementById("modal-wa-btn");
  const totalImages = 51;
  const whatsappNum = "254725481234"; // Replace with the client's WhatsApp number
  let galleryLoaded = false;

  if (!gallery || !galleryContainer || !folderToggle || !catalogFolder) {
    console.error("Error: Required catalog elements are missing in index.html");
    return;
  }

  const openModal = (imagePath, itemTitle) => {
    if (!productModal || !modalImg || !modalTitle || !modalWaBtn) return;

    modalImg.src = imagePath;
    modalImg.alt = itemTitle;
    modalTitle.textContent = itemTitle;
    modalWaBtn.href = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello JUNS TEXTILES, I am interested in ${itemTitle}.`)}`;
    productModal.style.display = "block";
  };

  const createProductCard = (index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const itemTitle = `Textile Fabric Item #${index}`;
    const imagePath = `./images/image%20${index}.jpg`;

    card.innerHTML = `
      <img src="${imagePath}" alt="${itemTitle}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x220?text=Image+${index}+Not+Found';" />
      <div class="product-info">
        <h4>${itemTitle}</h4>
        <button type="button" class="btn btn-secondary view-btn">
          <i class="fa-solid fa-eye"></i> Quick View
        </button>
      </div>
    `;

    card.querySelector(".view-btn")?.addEventListener("click", (event) => {
      event.stopPropagation();
      openModal(imagePath, itemTitle);
    });

    return card;
  };

  const loadGallery = () => {
    if (galleryLoaded) return;

    for (let i = 1; i <= totalImages; i++) {
      gallery.appendChild(createProductCard(i));
    }

    galleryLoaded = true;
  };

  const setGalleryVisibility = (isOpen) => {
    galleryContainer.classList.toggle("open", isOpen);
    folderToggle.textContent = isOpen ? "Close Folder" : "Open Folder";
    catalogFolder.setAttribute("aria-expanded", isOpen.toString());
    galleryContainer.setAttribute("aria-hidden", (!isOpen).toString());

    if (isOpen) {
      loadGallery();
    }
  };

   const menuToggle = document.querySelector('.menu-toggle');
const bannerNav = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  bannerNav.classList.toggle('active');
});
  const toggleFolder = () => {
    setGalleryVisibility(!galleryContainer.classList.contains("open"));
  };

  folderToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFolder();
  });

  catalogFolder.addEventListener("click", (event) => {
    if (event.target === folderToggle) return;
    toggleFolder();
  });

  catalogFolder.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFolder();
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      document.querySelectorAll(".product-card").forEach((card) => {
        const title = card.querySelector("h4")?.textContent.toLowerCase() || "";
        card.style.display = title.includes(searchTerm) ? "flex" : "none";
      });
    });
  }

  if (uploadForm) {
    uploadForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const titleInput = document.getElementById("item-title")?.value || "New Textile Item";
      const fileInput = document.getElementById("item-image")?.files[0];
      if (!fileInput) return;

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const card = document.createElement("div");
        card.className = "product-card";
        const imageSrc = loadEvent.target?.result || "";
        const message = encodeURIComponent(`Hello JUNS TEXTILES, I am inquiring about ${titleInput}.`);

        card.innerHTML = `
          <img src="${imageSrc}" alt="${titleInput}" />
          <div class="product-info">
            <h4>${titleInput}</h4>
            <a href="https://wa.me/${whatsappNum}?text=${message}" class="wa-btn-sm" target="_blank">
              <i class="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
            </a>
          </div>
        `;

        gallery.insertBefore(card, gallery.firstChild);
        uploadForm.reset();
        alert("New product image added successfully to the catalog view!");
      };
      reader.readAsDataURL(fileInput);
    });
  }

  if (closeModal && productModal) {
    closeModal.addEventListener("click", () => {
      productModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === productModal) {
        productModal.style.display = "none";
      }
    });
  }

  setGalleryVisibility(false);
});
