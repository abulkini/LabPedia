// Toggle Mobile Navigation Menu
        const mobileNavToggle = document.getElementById('mobile-nav-toggle');
        const mobileNavMenu = document.getElementById('mobile-nav-menu');
        function toggleMobileNavMenu() {
    if (!mobileNavMenu || !mobileNavToggle) return;
    mobileNavMenu.classList.toggle('hidden');
    const icon = mobileNavToggle.querySelector('.material-symbols-outlined');
    if (icon) {
        icon.textContent = mobileNavMenu.classList.contains('hidden') ? 'menu' : 'close';
    }
}
// Tab Switching Logic
        document.addEventListener('DOMContentLoaded', () => {
            const tabs = document.querySelectorAll('.tab-btn');
            const sections = document.querySelectorAll('.calc-section');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Reset all tabs
                    tabs.forEach(t => {
                        t.classList.remove('tab-active');
                        t.classList.add('tab-inactive');
                    });
                    // Hide all sections
                    sections.forEach(s => s.classList.add('hidden'));
                    // Hide all calculator result areas when changing tabs
                    document.querySelectorAll('[id$="ResultArea"]').forEach(result => result.classList.add('hidden'));

                    // Activate clicked tab
                    tab.classList.remove('tab-inactive');
                    tab.classList.add('tab-active');

                    // Show corresponding section
                    const targetId = tab.getAttribute('data-target');
                    document.getElementById(targetId).classList.remove('hidden');
                });
            });
        });

        // BMI Calculation Logic
        function calculateBMI() {
            const weightInput = document.getElementById('weight').value;
            const heightInput = document.getElementById('height').value;
            
            if (!weightInput || !heightInput || heightInput <= 0 || weightInput <= 0) {
                alert("Masukkan berat dan tinggi yang valid.");
                return;
            }

            const weight = parseFloat(weightInput);
            const heightInMeters = parseFloat(heightInput) / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            const roundedBmi = bmi.toFixed(1);

            // Display results area BMI
            const resultArea = document.getElementById('bmiResultArea');
            resultArea.classList.remove('hidden');

            // Update Value
            const valueEl = document.getElementById('bmiValue');
            valueEl.innerText = roundedBmi;

            // Determine Status and Colors
            const chip = document.getElementById('bmiCategoryChip');
            const icon = document.getElementById('bmiCategoryIcon');
            const text = document.getElementById('bmiCategoryText');

            // Reset classes
            valueEl.className = "font-display-lg text-display-lg";
            chip.className = "px-4 py-2 rounded-full font-label-md text-label-md border flex items-center gap-2";

            if (bmi < 18.5) {
                text.innerText = "Berat Badan Kurang";
                icon.innerText = "arrow_downward";
                valueEl.classList.add('text-tertiary-fixed-dim'); // Orange-ish
                chip.classList.add('bg-tertiary-fixed-dim/10', 'text-tertiary-fixed-dim', 'border-tertiary-fixed-dim/30');
            } else if (bmi >= 18.5 && bmi < 25) {
                text.innerText = "Normal";
                icon.innerText = "check_circle";
                valueEl.classList.add('text-secondary'); // Emerald/Green
                chip.classList.add('bg-secondary/10', 'text-secondary', 'border-secondary/30');
            } else if (bmi >= 25 && bmi < 30) {
                text.innerText = "Kelebihan Berat Badan";
                icon.innerText = "warning";
                valueEl.classList.add('text-tertiary-container'); // Darker Orange
                chip.classList.add('bg-tertiary-container/10', 'text-tertiary-container', 'border-tertiary-container/30');
            } else {
                text.innerText = "Obesitas";
                icon.innerText = "emergency";
                valueEl.classList.add('text-error'); // Red
                chip.classList.add('bg-error/10', 'text-error', 'border-error/30');
            }
        }

        //EGFR Calculation Logic
        function calculateEGFR() {
            const creatinineInput = document.getElementById('creatinine').value;
            const ageInput = document.getElementById('age').value;
            const genderInput = document.querySelector('input[name="gender"]:checked').value;
            if (!creatinineInput || !ageInput || creatinineInput <= 0 || ageInput <= 0) {
                alert("Masukkan nilai Kreatinin dan Usia yang valid.");
                return;
            }
            const creatinine = parseFloat(creatinineInput);
            const age = parseFloat(ageInput);
            let kappa = 0.7;
            if (genderInput === 'male') {
                kappa = 0.9;
            }
            let alpha = -1.2;
            if (genderInput === 'male' && creatinine <= 0.9) {
                alpha = -0.302;
            } else if (genderInput === 'female' && creatinine <= 0.7) {
                alpha = -0.241;
            } 

            
            const minTerm = Math.min(creatinine / kappa, 1);
            const maxTerm = Math.max(creatinine / kappa, 1);
            const coefficient = genderInput === 'female' ? 1.012 : 1;
            const egfr = 142 * Math.pow(minTerm, alpha) * Math.pow(maxTerm, -1.2) * Math.pow(0.9938, age) * coefficient;
            const roundedEgfr = egfr.toFixed(0);
        //Display Results Area for EGFR
        const resultArea = document.getElementById('egfrResultArea');
        resultArea.classList.remove('hidden');
        //Update Value EGFR
        const valueEl = document.getElementById('egfrValue');
        valueEl.innerText = roundedEgfr;
        //Determine Status and Colors for EGFR
        const chip = document.getElementById('egfrCategoryChip');
        const icon = document.getElementById('egfrCategoryIcon');
        const text = document.getElementById('egfrCategoryText');
        //Reset Classes
        valueEl.className = "font-display-lg text-display-lg";
        chip.className = "px-4 py-2 rounded-full font-label-md text-label-md border flex items-center gap-2";
        if (egfr >= 90) {
            text.innerText = "Stadium 1";
            icon.innerText = "check_circle";
            valueEl.classList.add('text-secondary'); // Emerald/Green
            chip.classList.add('bg-secondary/10', 'text-secondary', 'border-secondary/30');
        } else if (egfr >= 60 && egfr < 90) {
            text.innerText = "Stadium 2";
            icon.innerText = "warning";
            valueEl.classList.add('text-tertiary-container'); // Darker Orange
            chip.classList.add('bg-tertiary-container/10', 'text-tertiary-container', 'border-tertiary-container/30');
        } else if (egfr >= 30 && egfr < 60) {
            text.innerText = "Stadium 3";
            icon.innerText = "emergency";
            valueEl.classList.add('text-error'); // Red
            chip.classList.add('bg-error/10', 'text-error', 'border-error/30');
        } else if (egfr >= 15 && egfr < 30) {
            text.innerText = "Stadium 4";
            icon.innerText = "dangerous";
            valueEl.classList.add('text-error'); // Red
            chip.classList.add('bg-error/10', 'text-error', 'border-error/30');
        } else {
            text.innerText = "Stadium 5";
            icon.innerText = "report";
            valueEl.classList.add('text-error'); // Red
            chip.classList.add('bg-error/10', 'text-error', 'border-error/30');
        }
    }
        //LDL Calculation Logic
        function calculateLDL() {
            const totalCholesterolInput = document.getElementById('totalCholesterol').value;
            const hdlInput = document.getElementById('hdl').value;
            const triglyceridesInput = document.getElementById('triglycerides').value;
        
        if (!totalCholesterolInput || !hdlInput || !triglyceridesInput || totalCholesterolInput <= 0 || hdlInput <= 0 || triglyceridesInput <= 0) {
            alert("Masukkan nilai Total Kolesterol, HDL, dan Trigliserida yang valid.");
            return;
        }

        const totalCholesterol = parseFloat(totalCholesterolInput);
        const hdl = parseFloat(hdlInput);
        const triglycerides = parseFloat(triglyceridesInput);
        const ldl = totalCholesterol - hdl - (triglycerides / 5);
        const roundedLdl = ldl.toFixed(1);

        // Display results area
        const resultArea = document.getElementById('ldlResultArea');
        resultArea.classList.remove('hidden');

        //update Value
        const valueEl = document.getElementById('ldlValue');
            valueEl.innerText = roundedLdl;
        // Determine Status and Colors
        const chip = document.getElementById('ldlCategoryChip');
        const icon = document.getElementById('ldlCategoryIcon');
        const text = document.getElementById('ldlCategoryText');

        // Reset classes
        valueEl.className = "font-display-lg text-display-lg";
        chip.className = "px-4 py-2 rounded-full font-label-md text-label-md border flex items-center gap-2";

        if (ldl <= 100) {
            text.innerText = "Normal";
            icon.innerText = "check_circle";
            valueEl.classList.add('text-secondary'); // Emerald/Green
            chip.classList.add('bg-secondary/10', 'text-secondary', 'border-secondary/30');
        } else {
            text.innerText = "Tinggi";
            icon.innerText = "warning";
            valueEl.classList.add('text-error'); // Red
            chip.classList.add('bg-error/10', 'text-error', 'border-error/30');     
        }
        }
        
        // Sidebar search & mobile toggle
        (function() {
            const sidebarSearch = document.getElementById('sidebarSearch');
            const sidebarList = document.getElementById('sidebarList');
            const sidebarToggleBtn = document.getElementById('sidebarToggle');

            if (sidebarSearch) {
                sidebarSearch.addEventListener('input', () => {
                    const q = sidebarSearch.value.trim().toLowerCase();
                    const tabsArr = document.querySelectorAll('.tab-btn');
                    tabsArr.forEach(t => {
                        const label = t.innerText.toLowerCase();
                        t.style.display = label.includes(q) ? '' : 'none';
                    });
                    // Ensure sidebar is visible on mobile when searching
                    if (window.innerWidth < 1024 && sidebarList && q.length > 0) {
                        sidebarList.classList.remove('hidden');
                    }
                });
            }

            if (sidebarToggleBtn && sidebarList) {
                sidebarToggleBtn.addEventListener('click', () => {
                    if (window.innerWidth >= 1024) return; // only for mobile
                    sidebarList.classList.toggle('hidden');
                    const icon = sidebarToggleBtn.querySelector('.material-symbols-outlined');
                    if (icon) icon.textContent = sidebarList.classList.contains('hidden') ? 'menu' : 'close';
                });
            }
        })();

        // Toggle manual-only fields based on cellType selection
        document.addEventListener('DOMContentLoaded', () => {
            const cellTypeSelect = document.getElementById('cellType');
            const manualOnlyFields = document.querySelectorAll('.manual-only');

            if (cellTypeSelect) {
                cellTypeSelect.addEventListener('change', () => {
                    if (cellTypeSelect.value === 'manual') {
                        manualOnlyFields.forEach(field => field.classList.remove('hidden'));
                    } else {
                        manualOnlyFields.forEach(field => field.classList.add('hidden'));
                    }
                });
            }
        });

        // Cell count (Neubauer) calculation
        function calculateCellCount() {
            const cellType = document.getElementById('cellType').value;
            const cellCountInput = document.getElementById('cellCount').value;
            const squaresCountInput = document.getElementById('squaresCount').value;
            const dilutionInput = document.getElementById('dilution').value;
            const areaInput = document.getElementById('areaPerSquare').value;
            const depthInput = document.getElementById('depth').value;

            // Presets (suggested typical values for Improved Neubauer)
            let squaresCount = squaresCountInput ? parseFloat(squaresCountInput) : null;
            let dilution = dilutionInput ? parseFloat(dilutionInput) : null;
            let areaPerSquare = areaInput ? parseFloat(areaInput) : null; // mm^2
            let depth = depthInput ? parseFloat(depthInput) : null; // mm

            if (cellType === 'wbc' && (!squaresCount || !dilution || !areaPerSquare || !depth)) {
                squaresCount = squaresCount || 4; // 4 large corner squares
                dilution = dilution || 20; // common WBC dilution
                areaPerSquare = areaPerSquare || 1; // large square = 1 mm^2
                depth = depth || 0.1; // chamber depth 0.1 mm
            } else if (cellType === 'rbc' && (!squaresCount || !dilution || !areaPerSquare || !depth)) {
                squaresCount = squaresCount || 5; // 5 small squares (center)
                dilution = dilution || 200; // typical RBC dilution
                areaPerSquare = areaPerSquare || 0.0025; // small square ≈ 0.0025 mm^2
                depth = depth || 0.1;
            } else if (cellType === 'plt' && (!squaresCount || !dilution || !areaPerSquare || !depth)) {
                squaresCount = squaresCount || 25; // e.g., 25 small squares
                dilution = dilution || 100; // platelet dilution often around 1:100
                areaPerSquare = areaPerSquare || 0.04; // medium square ≈ 0.04 mm^2
                depth = depth || 0.1;
            } else {
                // Manual: require values
                if (!squaresCount || !dilution || !areaPerSquare || !depth) {
                    alert('Isi semua parameter atau pilih preset yang sesuai.');
                    return;
                }
            }

            if (!cellCountInput || parseFloat(cellCountInput) <= 0) {
                alert('Masukkan jumlah sel yang dihitung (total) yang valid.');
                return;
            }

            const totalCount = parseFloat(cellCountInput);
            const avgPerSquare = totalCount / squaresCount;
            const volumePerSquare_mm3 = areaPerSquare * depth; // mm^3 = µL
            const cellsPer_uL = (avgPerSquare * dilution) / volumePerSquare_mm3;
            const cellsPer_mL = cellsPer_uL * 1000;

            const roundedPer_uL = Math.round(cellsPer_uL);
            const roundedPer_mL = Math.round(cellsPer_mL);

            // Display results
            const resultArea = document.getElementById('cellcountResultArea');
            resultArea.classList.remove('hidden');
            const valueEl = document.getElementById('cellcountValue');
            valueEl.innerText = `${roundedPer_uL.toLocaleString()} sel/µL  ·  ${roundedPer_mL.toLocaleString()} sel/mL`;

            const chip = document.getElementById('cellcountCategoryChip');
            const icon = document.getElementById('cellcountCategoryIcon');
            const text = document.getElementById('cellcountCategoryText');
            chip.className = "px-4 py-2 rounded-full font-label-md text-label-md border flex items-center gap-2";

            // Basic contextual label (no clinical interpretation provided)
            text.innerText = cellType === 'wbc' ? 'Leukosit' : (cellType === 'rbc' ? 'Eritrosit' : (cellType === 'plt' ? 'Trombosit' : 'Manual'));
            icon.innerText = 'science';
        }

        // Expose functions globally for inline HTML events
        window.toggleMobileNavMenu = toggleMobileNavMenu;
        window.calculateBMI = calculateBMI;
        window.calculateEGFR = calculateEGFR;
        window.calculateLDL = calculateLDL;
        window.calculateCellCount = calculateCellCount;