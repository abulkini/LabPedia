        // Modal Logic
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            const content = document.getElementById('modal-content-' + modalId.split('-')[1]);

            modal.classList.remove('hidden');
            modal.classList.add('flex');

            // Small delay to allow display block to apply before animating opacity
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                if (content) {
                    content.classList.remove('scale-95');
                    content.classList.add('scale-100');
                }
            }, 10);

            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            const content = document.getElementById('modal-content-' + modalId.split('-')[1]);

            modal.classList.add('opacity-0');
            if (content) {
                content.classList.remove('scale-100');
                content.classList.add('scale-95');
            }

            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Simulasi pencarian dengan debounce sederhana
        const searchInput = document.getElementById('searchInput');
        const mobileNavToggle = document.getElementById('mobile-nav-toggle');
        const mobileNavMenu = document.getElementById('mobile-nav-menu');
        const mobileCategorySelect = document.getElementById('mobileCategorySelect');
        const cards = document.querySelectorAll('#dictionaryGrid > div');
        const categoryButtons = {
            all: document.getElementById('tab-all'),
            hematologi: document.getElementById('tab-hematologi'),
            'kimia klinik': document.getElementById('tab-kimia'),
            imunologi: document.getElementById('tab-imunologi')
        };
        const searchAliases = {
            'trigliserida': 'modal-trigliserida',
            'hdl': 'modal-hdl',
            'high-density lipoprotein': 'modal-hdl',
            'ldl': 'modal-ldl',
            'low-density lipoprotein': 'modal-ldl',
            'ureum': 'modal-ureum',
            'kreatinin': 'modal-kreatinin',
            'sgot': 'modal-sgot',
            'ast': 'modal-sgot',
            'sgpt': 'modal-sgpt',
            'alt': 'modal-sgpt',
            'hiv': 'modal-hiv',
            'widal': 'modal-widal',
            'sifilis': 'modal-sifilis',
            'hbsag': 'modal-hbsag',
            'hcv': 'modal-hcv',
            'ns1': 'modal-ns1',
            'igg/igm dengue': 'modal-iggigm-dengue',
            'igg igm dengue': 'modal-iggigm-dengue',
            'rdt malaria': 'modal-rdt-malaria',
            'tes kehamilan': 'modal-tes-kehamilan',
            'golongan darah': 'modal-golongan-darah',
            'gula darah sewaktu': 'modal-gds',
            'gds': 'modal-gds',
            'asam urat': 'modal-asam-urat',
            'hematokrit': 'modal-hematokrit',
            'laju endap darah': 'modal-led',
            'led': 'modal-led',
            'mcv': 'modal-mcv',
            'mch': 'modal-mch',
            'mchc': 'modal-mchc',
            'rdw': 'modal-rdw'
        };
        let timeout = null;
        let lastOpenedSearchModal = null;
        let activeCategory = 'all';

        function toggleMobileNavMenu() {
            if (!mobileNavMenu || !mobileNavToggle) return;
            mobileNavMenu.classList.toggle('hidden');
            const icon = mobileNavToggle.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = mobileNavMenu.classList.contains('hidden') ? 'menu' : 'close';
            }
        }

        function normalizeCategory(text) {
            return text.toLowerCase().trim().replace(/\s+/g, ' ');
        }

        function getCardCategory(card) {
            const label = card.querySelector('span.font-label-md');
            return label ? normalizeCategory(label.textContent) : '';
        }

        function setActiveCategoryButton(category) {
            Object.entries(categoryButtons).forEach(([key, button]) => {
                if (!button) return;
                if (key === category) {
                    button.classList.add('bg-surface-container-highest', 'text-primary', 'border-b-2', 'border-primary');
                    button.classList.remove('text-on-surface-variant');
                } else {
                    button.classList.remove('bg-surface-container-highest', 'text-primary', 'border-b-2', 'border-primary');
                    if (!button.classList.contains('text-on-surface-variant')) {
                        button.classList.add('text-on-surface-variant');
                    }
                }
            });
        }

        function filterCards() {
            const query = searchInput.value.toLowerCase().trim();

            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('p').textContent.toLowerCase();
                const category = getCardCategory(card);
                const matchesCategory = activeCategory === 'all' || category === activeCategory;
                const matchesSearch = query.length === 0 || title.includes(query) || desc.includes(query);

                if (matchesCategory && matchesSearch) {
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = 'fadeIn 0.3s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function setCategory(category) {
            activeCategory = normalizeCategory(category);
            setActiveCategoryButton(activeCategory);
            if (mobileCategorySelect) {
                mobileCategorySelect.value = activeCategory;
            }
            filterCards();
            if (mobileNavMenu && !mobileNavMenu.classList.contains('hidden')) {
                toggleMobileNavMenu();
            }
        }

        function tryOpenSearchModal(query) {
            const modalId = searchAliases[query];
            if (!modalId) {
                lastOpenedSearchModal = null;
                return;
            }
            if (lastOpenedSearchModal !== modalId) {
                lastOpenedSearchModal = modalId;
                openModal(modalId);
            }
        }

        searchInput.addEventListener('input', function (e) {
            clearTimeout(timeout);
            const query = e.target.value.toLowerCase().trim();

            timeout = setTimeout(() => {
                filterCards();

                if (query.length > 0) {
                    tryOpenSearchModal(query);
                }
            }, 300); // 300ms debounce
        });

        // Inisialisasi keadaan awal kategori
        setActiveCategoryButton(activeCategory);

        // Expose functions globally for inline HTML events
        window.openModal = openModal;
        window.closeModal = closeModal;
        window.setCategory = setCategory;
        window.toggleMobileNavMenu = toggleMobileNavMenu;