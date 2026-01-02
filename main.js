(function () {
  const STORAGE_KEYS = {
    profile: "milestone_profile_v1",
    entries: "milestone_entries_v1",
    catalog: "milestone_catalog_v1"
  };

  const DOMAIN_KEYS = {
    personal_social: "domain_personal_social",
    fine_motor_adaptive: "domain_fine_motor_adaptive",
    gross_motor: "domain_gross_motor",
    language: "domain_language"
  };

  const DOMAIN_ORDER = [
    "personal_social",
    "fine_motor_adaptive",
    "gross_motor",
    "language"
  ];

  const MANUAL_OPTION = "__manual__";
  const DEFAULT_LANGUAGE = "id";
  const SUPPORTED_LANGUAGES = ["id", "en"];

  const FALLBACK_CSV = [
    "id,domain,title,age_min_months,age_target_months,age_max_months,support_tip,expect_next",
    "PS001,personal_social,Smiles at familiar voice,1,2,3,Talk and smile during routines,Looks for simple social games",
    "PS002,personal_social,Enjoys peekaboo,3,4,6,Play short turn taking games,Shows preference for caregivers",
    "PS003,personal_social,Shows preference for caregivers,5,6,8,Offer comfort and predictable routines,Waves bye bye",
    "PS004,personal_social,Waves bye bye,8,9,11,Model waving and say bye bye,Offers a toy to share",
    "PS005,personal_social,Offers a toy to share,10,12,14,Practice give and take play,Plays simple pretend",
    "PS006,personal_social,Plays simple pretend,14,18,22,Use dolls and kitchen play,Shows concern when others upset",
    "PS007,personal_social,Shows concern when others upset,20,24,30,Name feelings and model empathy,Joins simple group play",
    "FM001,fine_motor_adaptive,Tracks moving object with eyes,1,2,3,Move a toy slowly side to side,Brings hands together",
    "FM002,fine_motor_adaptive,Brings hands together,3,4,6,Encourage midline play,Transfers object hand to hand",
    "FM003,fine_motor_adaptive,Transfers object hand to hand,5,6,8,Offer safe objects to switch hands,Pincer grasp on small items",
    "FM004,fine_motor_adaptive,Pincer grasp on small items,8,9,11,Offer soft finger foods,Puts blocks into a cup",
    "FM005,fine_motor_adaptive,Puts blocks into a cup,10,12,14,Play drop and fill games,Scribbles with crayon",
    "FM006,fine_motor_adaptive,Scribbles with crayon,15,18,22,Provide thick crayons and paper,Stacks 4 blocks",
    "FM007,fine_motor_adaptive,Stacks 4 blocks,20,24,30,Practice stacking and knocking down,Turns pages one at a time",
    "GM001,gross_motor,Holds head up briefly,1,2,3,Give short tummy time daily,Rolls front to back",
    "GM002,gross_motor,Rolls front to back,3,4,6,Use toys to encourage rolling,Sits with minimal support",
    "GM003,gross_motor,Sits with minimal support,5,6,8,Use pillows for safe sitting,Crawls or scoots",
    "GM004,gross_motor,Crawls or scoots,8,9,11,Place toys just out of reach,Pulls to stand",
    "GM005,gross_motor,Pulls to stand,10,12,14,Provide sturdy furniture for support,Walks a few steps",
    "GM006,gross_motor,Walks a few steps,13,15,18,Hold hands and practice cruising,Runs with better balance",
    "GM007,gross_motor,Runs with better balance,20,24,30,Create safe open space,Climbs steps with help",
    "LA001,language,Coos or makes vowel sounds,1,2,3,Talk and sing often,Babbles with consonant sounds",
    "LA002,language,Babbles with consonant sounds,5,6,8,Imitate sounds and pause,Responds to name",
    "LA003,language,Responds to name,7,9,11,Call name and reward response,Says one word",
    "LA004,language,Says one word,10,12,14,Label objects during play,Uses 10 to 20 words",
    "LA005,language,Uses 10 to 20 words,14,18,22,Read simple picture books,Combines two words",
    "LA006,language,Combines two words,20,24,30,Model two word phrases,Uses short sentences"
  ].join("\n");

  const FALLBACK_TRANSLATIONS = {
    id: {
      app_title: "Milestone Compass",
      app_tagline: "Lacak milestone ala Denver II dengan langkah lanjutan yang jelas dan progres yang bisa dibagikan.",
      action_export_summary: "Ekspor ringkasan",
      action_export_log: "Ekspor log CSV",
      section_child_profile: "Profil anak",
      label_child_name: "Nama anak",
      placeholder_child_name: "mis. Aidan",
      label_birth_date: "Tanggal lahir",
      label_assessment_date: "Tanggal asesmen",
      label_manual_age: "Atau masukkan usia dalam bulan",
      placeholder_manual_age: "Mengganti usia terhitung",
      metric_age_months: "Usia (bulan)",
      metric_age_days: "Usia (hari)",
      metric_logged: "Milestone dicatat",
      helper_storage: "Data tersimpan lokal di browser ini. Gunakan tombol ekspor untuk berbagi progres dengan dokter atau pengasuh.",
      section_log_milestone: "Catat milestone",
      label_domain: "Domain",
      label_milestone: "Milestone",
      label_manual_milestone: "Judul milestone manual",
      placeholder_manual_milestone: "Ketik milestone khusus",
      label_date_observed: "Tanggal terlihat",
      label_status: "Status",
      status_achieved: "Tercapai",
      status_emerging: "Berkembang",
      status_not_yet: "Belum",
      label_observed_by: "Diamati oleh",
      placeholder_observed_by: "Orang tua, pengasuh, dokter",
      label_notes: "Catatan",
      placeholder_notes: "Konteks, contoh, atau isyarat",
      button_save_entry: "Simpan entri",
      button_update_entry: "Perbarui entri",
      button_clear: "Bersihkan",
      edit_notice: "Sedang mengedit entri.",
      button_cancel_edit: "Batal edit",
      section_summary: "Ringkasan progres",
      summary_no_entries: "Belum ada entri.",
      summary_last_update: "Pembaruan terakhir {date} untuk {name}.",
      button_clear_log: "Hapus log",
      summary_achieved: "Tercapai",
      summary_emerging: "Berkembang",
      summary_not_yet: "Belum",
      summary_total: "Total dicatat",
      label_language: "Bahasa",
      button_copy_summary: "Salin ringkasan",
      section_catalog: "Katalog milestone",
      catalog_loaded_default: "Dimuat dari data.csv",
      catalog_loaded_saved: "Dimuat dari katalog tersimpan",
      catalog_loaded_import: "Dimuat dari CSV impor",
      catalog_loaded_builtin: "Memuat katalog bawaan (akses file diblokir).",
      catalog_load_error: "Tidak bisa memuat data.csv. Impor file CSV.",
      button_collapse: "Tutup",
      button_expand: "Buka",
      placeholder_search_catalog: "Cari milestone",
      filter_all_domains: "Semua domain",
      filter_all_ages: "Semua usia",
      filter_age_0_6: "0 sampai 6 bulan",
      filter_age_6_12: "6 sampai 12 bulan",
      filter_age_12_18: "12 sampai 18 bulan",
      filter_age_18_24: "18 sampai 24 bulan",
      filter_age_24_36: "24 sampai 36 bulan",
      button_import_csv: "Impor CSV",
      button_reset_catalog: "Setel ulang katalog",
      catalog_no_results: "Tidak ada milestone yang cocok.",
      label_support_tip: "Tips dukungan",
      label_expect_next: "Langkah berikutnya",
      button_add_to_log: "Tambahkan ke log",
      status_age_not_set: "Usia belum diisi",
      status_upcoming: "Akan datang",
      status_in_range: "Dalam rentang",
      status_past: "Lewat rentang",
      section_upcoming: "Apa yang diharapkan berikutnya",
      upcoming_subtitle: "Berdasarkan usia dan milestone yang belum selesai.",
      upcoming_no_age: "Masukkan usia untuk melihat milestone berikutnya.",
      upcoming_none: "Tidak ada milestone berikutnya di rentang usia ini.",
      section_log: "Log progres",
      log_subtitle: "Buat, perbarui, hapus, dan cari entri.",
      placeholder_search_log: "Cari log",
      filter_all_statuses: "Semua status",
      table_milestone: "Milestone",
      table_domain: "Domain",
      table_status: "Status",
      table_date: "Tanggal",
      table_age_months: "Usia (bulan)",
      table_observer: "Pengamat",
      table_actions: "Aksi",
      button_edit: "Edit",
      button_delete: "Hapus",
      log_empty: "Belum ada entri. Tambahkan dari formulir atau katalog.",
      footer_note: "Denver II adalah alat skrining, bukan diagnosis. Gunakan pelacak ini untuk organisasi pribadi dan konsultasikan dengan profesional terlatih untuk skrining resmi.",
      alert_select_milestone: "Pilih milestone.",
      alert_manual_title: "Masukkan judul milestone manual.",
      alert_import_failed: "Impor CSV gagal.",
      confirm_reset_catalog: "Setel ulang katalog ke data.csv default?",
      confirm_clear_log: "Hapus semua entri log? Tindakan ini tidak dapat dibatalkan.",
      confirm_delete_entry: "Hapus entri ini?",
      alert_no_entries_export: "Tidak ada entri untuk diekspor.",
      alert_summary_copied: "Ringkasan disalin.",
      prompt_copy_summary: "Salin ringkasan",
      error_csv_empty: "CSV kosong",
      error_csv_missing_column: "Kolom wajib tidak ada: {column}",
      error_csv_missing_fields: "Baris {row} tidak memiliki kolom wajib",
      error_csv_invalid_domain: "Baris {row} memiliki domain tidak valid {domain}",
      error_csv_invalid_age: "Baris {row} memiliki nilai usia tidak valid",
      summary_title_prefix: "Ringkasan milestone untuk",
      summary_name_fallback: "Anak",
      summary_age_label: "Usia",
      summary_age_not_set: "Usia belum diisi",
      summary_total_label: "Total dicatat",
      summary_achieved_label: "Tercapai",
      summary_emerging_label: "Berkembang",
      summary_not_yet_label: "Belum",
      summary_upcoming_label: "Milestone berikutnya",
      summary_months_label: "bulan",
      summary_months_short: "bln",
      option_manual_entry: "Entri manual",
      page_title: "Milestone Compass",
      domain_personal_social: "Personal-Sosial",
      domain_fine_motor_adaptive: "Motorik Halus-Adaptif",
      domain_gross_motor: "Motorik Kasar",
      domain_language: "Bahasa"
    },
    en: {
      app_title: "Milestone Compass",
      app_tagline: "Track Denver II style milestones with clear next steps and shareable progress.",
      action_export_summary: "Export summary",
      action_export_log: "Export log CSV",
      section_child_profile: "Child profile",
      label_child_name: "Child name",
      placeholder_child_name: "e.g. Aidan",
      label_birth_date: "Birth date",
      label_assessment_date: "Assessment date",
      label_manual_age: "Or enter age in months",
      placeholder_manual_age: "Overrides computed age",
      metric_age_months: "Age (months)",
      metric_age_days: "Age (days)",
      metric_logged: "Logged milestones",
      helper_storage: "Data saves locally in this browser. Use the export buttons to share progress with a doctor or caregiver.",
      section_log_milestone: "Log a milestone",
      label_domain: "Domain",
      label_milestone: "Milestone",
      label_manual_milestone: "Manual milestone title",
      placeholder_manual_milestone: "Type a custom milestone",
      label_date_observed: "Date observed",
      label_status: "Status",
      status_achieved: "Achieved",
      status_emerging: "Emerging",
      status_not_yet: "Not yet",
      label_observed_by: "Observed by",
      placeholder_observed_by: "Parent, caregiver, doctor",
      label_notes: "Notes",
      placeholder_notes: "Context, examples, or cues",
      button_save_entry: "Save entry",
      button_update_entry: "Update entry",
      button_clear: "Clear",
      edit_notice: "Editing existing entry.",
      button_cancel_edit: "Cancel edit",
      section_summary: "Progress summary",
      summary_no_entries: "No entries yet.",
      summary_last_update: "Last update {date} for {name}.",
      button_clear_log: "Clear log",
      summary_achieved: "Achieved",
      summary_emerging: "Emerging",
      summary_not_yet: "Not yet",
      summary_total: "Total logged",
      label_language: "Language",
      button_copy_summary: "Copy summary",
      section_catalog: "Milestone catalog",
      catalog_loaded_default: "Loaded from data.csv",
      catalog_loaded_saved: "Loaded from saved catalog",
      catalog_loaded_import: "Loaded from imported CSV",
      catalog_loaded_builtin: "Loaded built-in catalog (file access blocked).",
      catalog_load_error: "Could not load data.csv. Import a CSV file.",
      button_collapse: "Collapse",
      button_expand: "Expand",
      placeholder_search_catalog: "Search milestones",
      filter_all_domains: "All domains",
      filter_all_ages: "All ages",
      filter_age_0_6: "0 to 6 months",
      filter_age_6_12: "6 to 12 months",
      filter_age_12_18: "12 to 18 months",
      filter_age_18_24: "18 to 24 months",
      filter_age_24_36: "24 to 36 months",
      button_import_csv: "Import CSV",
      button_reset_catalog: "Reset catalog",
      catalog_no_results: "No milestones match the filters.",
      label_support_tip: "Support tip",
      label_expect_next: "Expect next",
      button_add_to_log: "Add to log",
      status_age_not_set: "Age not set",
      status_upcoming: "Upcoming",
      status_in_range: "In range",
      status_past: "Past window",
      section_upcoming: "What to expect next",
      upcoming_subtitle: "Based on age and unfinished milestones.",
      upcoming_no_age: "Enter an age to see upcoming milestones.",
      upcoming_none: "No upcoming milestones in the current age window.",
      section_log: "Progress log",
      log_subtitle: "Create, update, delete, and search entries.",
      placeholder_search_log: "Search log",
      filter_all_statuses: "All statuses",
      table_milestone: "Milestone",
      table_domain: "Domain",
      table_status: "Status",
      table_date: "Date",
      table_age_months: "Age (months)",
      table_observer: "Observer",
      table_actions: "Actions",
      button_edit: "Edit",
      button_delete: "Delete",
      log_empty: "No entries yet. Add one from the form or catalog.",
      footer_note: "Denver II is a screening tool and not a diagnosis. Use this tracker for personal organization and consult trained professionals for official screening.",
      alert_select_milestone: "Please select a milestone.",
      alert_manual_title: "Enter a manual milestone title.",
      alert_import_failed: "Unable to import CSV.",
      confirm_reset_catalog: "Reset catalog to the default data.csv file?",
      confirm_clear_log: "Clear all log entries? This cannot be undone.",
      confirm_delete_entry: "Delete this entry?",
      alert_no_entries_export: "No entries to export.",
      alert_summary_copied: "Summary copied.",
      prompt_copy_summary: "Copy summary",
      error_csv_empty: "CSV is empty",
      error_csv_missing_column: "Missing required column: {column}",
      error_csv_missing_fields: "Row {row} is missing required fields",
      error_csv_invalid_domain: "Row {row} has invalid domain {domain}",
      error_csv_invalid_age: "Row {row} has invalid age values",
      summary_title_prefix: "Milestone summary for",
      summary_name_fallback: "Child",
      summary_age_label: "Age",
      summary_age_not_set: "Age not set",
      summary_total_label: "Total logged",
      summary_achieved_label: "Achieved",
      summary_emerging_label: "Emerging",
      summary_not_yet_label: "Not yet",
      summary_upcoming_label: "Upcoming milestones",
      summary_months_label: "months",
      summary_months_short: "mo",
      option_manual_entry: "Manual entry",
      page_title: "Milestone Compass",
      domain_personal_social: "Personal-Social",
      domain_fine_motor_adaptive: "Fine Motor-Adaptive",
      domain_gross_motor: "Gross Motor",
      domain_language: "Language"
    }
  };

  const state = {
    catalog: [],
    entries: [],
    profile: {
      childName: "",
      birthDate: "",
      assessmentDate: todayISO(),
      manualAgeMonths: ""
    },
    translations: {},
    uiLanguage: DEFAULT_LANGUAGE,
    catalogStatusKey: "catalog_loaded_default",
    editingId: null,
    catalogSource: "data.csv"
  };

  const el = (id) => document.getElementById(id);

  const elements = {
    childName: el("childName"),
    birthDate: el("birthDate"),
    assessmentDate: el("assessmentDate"),
    manualAgeMonths: el("manualAgeMonths"),
    ageMonths: el("ageMonths"),
    ageDays: el("ageDays"),
    totalEntries: el("totalEntries"),
    entryDomain: el("entryDomain"),
    entryMilestone: el("entryMilestone"),
    manualMilestoneWrap: el("manualMilestoneWrap"),
    entryManualMilestone: el("entryManualMilestone"),
    entryDate: el("entryDate"),
    entryStatus: el("entryStatus"),
    entryObserver: el("entryObserver"),
    entryNotes: el("entryNotes"),
    saveEntryBtn: el("saveEntryBtn"),
    updateEntryBtn: el("updateEntryBtn"),
    clearEntryBtn: el("clearEntryBtn"),
    cancelEditBtn: el("cancelEditBtn"),
    editNotice: el("editNotice"),
    exportLogBtn: el("exportLogBtn"),
    exportSummaryBtn: el("exportSummaryBtn"),
    copySummaryBtn: el("copySummaryBtn"),
    clearLogBtn: el("clearLogBtn"),
    summarySubtitle: el("summarySubtitle"),
    countAchieved: el("countAchieved"),
    countEmerging: el("countEmerging"),
    countNotYet: el("countNotYet"),
    countTotal: el("countTotal"),
    catalogStatus: el("catalogStatus"),
    catalogSearch: el("catalogSearch"),
    catalogDomainFilter: el("catalogDomainFilter"),
    catalogAgeFilter: el("catalogAgeFilter"),
    catalogList: el("catalogList"),
    catalogEmpty: el("catalogEmpty"),
    catalogImport: el("catalogImport"),
    catalogResetBtn: el("catalogResetBtn"),
    upcomingList: el("upcomingList"),
    upcomingEmpty: el("upcomingEmpty"),
    logSearch: el("logSearch"),
    logDomainFilter: el("logDomainFilter"),
    logStatusFilter: el("logStatusFilter"),
    logTableBody: el("logTableBody"),
    logEmpty: el("logEmpty")
  };

  init();

  async function init() {
    loadProfile();
    loadEntries();
    bindEvents();
    setupDomainOptions();
    await loadTranslations();
    await loadCatalog();
    updateMilestoneOptions();
    resetEntryForm();
    renderAll();
  }

  function bindEvents() {
    elements.childName.addEventListener("input", onProfileChange);
    elements.birthDate.addEventListener("change", onProfileChange);
    elements.assessmentDate.addEventListener("change", onProfileChange);
    elements.manualAgeMonths.addEventListener("input", onProfileChange);

    elements.entryDomain.addEventListener("change", updateMilestoneOptions);
    elements.entryMilestone.addEventListener("change", toggleManualMilestone);

    elements.saveEntryBtn.addEventListener("click", saveEntry);
    elements.updateEntryBtn.addEventListener("click", updateEntry);
    elements.clearEntryBtn.addEventListener("click", resetEntryForm);
    elements.cancelEditBtn.addEventListener("click", resetEntryForm);

    elements.exportLogBtn.addEventListener("click", exportLogCSV);
    elements.exportSummaryBtn.addEventListener("click", exportSummaryText);
    elements.copySummaryBtn.addEventListener("click", copySummaryText);
    elements.clearLogBtn.addEventListener("click", clearLog);

    elements.catalogSearch.addEventListener("input", renderCatalog);
    elements.catalogDomainFilter.addEventListener("change", renderCatalog);
    elements.catalogAgeFilter.addEventListener("change", renderCatalog);

    elements.catalogImport.addEventListener("change", handleCatalogImport);
    elements.catalogResetBtn.addEventListener("click", resetCatalog);

    elements.logSearch.addEventListener("input", renderLog);
    elements.logDomainFilter.addEventListener("change", renderLog);
    elements.logStatusFilter.addEventListener("change", renderLog);

    bindLanguageToggle();
    bindCollapsiblePanels();
  }

  function bindCollapsiblePanels() {
    document.querySelectorAll("[data-collapse-target]").forEach((button) => {
      button.addEventListener("click", () => togglePanel(button));
    });
  }

  function togglePanel(button) {
    const targetId = button.getAttribute("data-collapse-target");
    const body = document.getElementById(targetId);
    const panel = button.closest(".panel");
    if (!body || !panel) return;
    const isCollapsed = panel.classList.toggle("is-collapsed");
    button.setAttribute("aria-expanded", String(!isCollapsed));
    button.textContent = isCollapsed ? t("button_expand") : t("button_collapse");
  }

  function bindLanguageToggle() {
    document.querySelectorAll(".lang-btn").forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
      });
    });
    updateLanguageToggle();
  }

  function setLanguage(language) {
    state.uiLanguage = normalizeLanguage(language);
    updateLanguageToggle();
    applyTranslations();
    renderAll();
  }

  function updateLanguageToggle() {
    const current = normalizeLanguage(state.uiLanguage);
    document.querySelectorAll(".lang-btn").forEach((button) => {
      const isActive = button.dataset.lang === current;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  async function loadTranslations() {
    const [idLabels, enLabels] = await Promise.all([
      fetchTranslation("id"),
      fetchTranslation("en")
    ]);
    state.translations.id = idLabels || FALLBACK_TRANSLATIONS.id;
    state.translations.en = enLabels || FALLBACK_TRANSLATIONS.en;
    applyTranslations();
  }

  function getTranslations(language) {
    const lang = normalizeLanguage(language);
    return state.translations[lang] || FALLBACK_TRANSLATIONS[lang] || FALLBACK_TRANSLATIONS[DEFAULT_LANGUAGE];
  }

  function t(key, params = {}) {
    const labels = getTranslations(state.uiLanguage);
    let text = labels[key] || key;
    Object.keys(params).forEach((param) => {
      text = text.replaceAll(`{${param}}`, params[param]);
    });
    return text;
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
    document.documentElement.lang = state.uiLanguage;
    document.title = t("page_title");
    updateCollapseButtons();
    updateCatalogStatus();
    setupDomainOptions();
    updateMilestoneOptions();
  }

  function updateCollapseButtons() {
    document.querySelectorAll("[data-collapse-target]").forEach((button) => {
      const panel = button.closest(".panel");
      const isCollapsed = panel?.classList.contains("is-collapsed");
      button.textContent = isCollapsed ? t("button_expand") : t("button_collapse");
    });
  }

  function setCatalogStatus(key) {
    state.catalogStatusKey = key;
    elements.catalogStatus.textContent = t(key);
  }

  function updateCatalogStatus() {
    if (!elements.catalogStatus) return;
    elements.catalogStatus.textContent = t(state.catalogStatusKey);
  }

  function getDomainLabel(domain) {
    const key = DOMAIN_KEYS[domain];
    return key ? t(key) : domain;
  }

  async function fetchTranslation(lang) {
    try {
      const response = await fetch(`${lang}.json`, { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load translation");
      return await response.json();
    } catch (err) {
      return null;
    }
  }

  function onProfileChange() {
    state.profile = {
      childName: elements.childName.value.trim(),
      birthDate: elements.birthDate.value,
      assessmentDate: elements.assessmentDate.value || todayISO(),
      manualAgeMonths: elements.manualAgeMonths.value
    };
    saveProfile();
    renderAll();
  }

  function setupDomainOptions() {
    const entryValue = elements.entryDomain.value || DOMAIN_ORDER[0];
    const catalogValue = elements.catalogDomainFilter.value || "all";
    const logValue = elements.logDomainFilter.value || "all";

    const domainOptions = DOMAIN_ORDER.map((domain) => {
      return createOption(domain, getDomainLabel(domain));
    });

    elements.entryDomain.innerHTML = "";
    domainOptions.forEach((opt) => elements.entryDomain.appendChild(opt.cloneNode(true)));
    elements.entryDomain.value = entryValue;

    elements.catalogDomainFilter.innerHTML = "";
    elements.catalogDomainFilter.appendChild(createOption("all", t("filter_all_domains")));
    domainOptions.forEach((opt) => elements.catalogDomainFilter.appendChild(opt.cloneNode(true)));
    elements.catalogDomainFilter.value = catalogValue;

    elements.logDomainFilter.innerHTML = "";
    elements.logDomainFilter.appendChild(createOption("all", t("filter_all_domains")));
    domainOptions.forEach((opt) => elements.logDomainFilter.appendChild(opt.cloneNode(true)));
    elements.logDomainFilter.value = logValue;
  }

  async function loadCatalog() {
    const cached = localStorage.getItem(STORAGE_KEYS.catalog);
    if (cached) {
      try {
        state.catalog = JSON.parse(cached);
        state.catalogSource = "saved catalog";
        setCatalogStatus("catalog_loaded_saved");
        return;
      } catch (err) {
        localStorage.removeItem(STORAGE_KEYS.catalog);
      }
    }

    try {
      const response = await fetch("data.csv", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load data.csv");
      }
      const text = await response.text();
      state.catalog = parseCatalogCSV(text);
      state.catalogSource = "data.csv";
      setCatalogStatus("catalog_loaded_default");
    } catch (err) {
      try {
        state.catalog = parseCatalogCSV(FALLBACK_CSV);
        state.catalogSource = "built-in";
        setCatalogStatus("catalog_loaded_builtin");
      } catch (parseErr) {
        state.catalog = [];
        setCatalogStatus("catalog_load_error");
      }
    }
  }

  function handleCatalogImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = parseCatalogCSV(String(e.target.result || ""));
        state.catalog = parsed;
        localStorage.setItem(STORAGE_KEYS.catalog, JSON.stringify(parsed));
        state.catalogSource = "imported";
        setCatalogStatus("catalog_loaded_import");
        updateMilestoneOptions();
        renderAll();
      } catch (err) {
        alert(err.message || t("alert_import_failed"));
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  async function resetCatalog() {
    if (!confirm(t("confirm_reset_catalog"))) return;
    localStorage.removeItem(STORAGE_KEYS.catalog);
    await loadCatalog();
    updateMilestoneOptions();
    renderAll();
  }

  function loadProfile() {
    const raw = localStorage.getItem(STORAGE_KEYS.profile);
    if (!raw) {
      applyProfileToInputs();
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      state.profile = {
        childName: parsed.childName || "",
        birthDate: parsed.birthDate || "",
        assessmentDate: parsed.assessmentDate || todayISO(),
        manualAgeMonths: parsed.manualAgeMonths || ""
      };
      applyProfileToInputs();
    } catch (err) {
      applyProfileToInputs();
    }
  }

  function applyProfileToInputs() {
    elements.childName.value = state.profile.childName;
    elements.birthDate.value = state.profile.birthDate;
    elements.assessmentDate.value = state.profile.assessmentDate || todayISO();
    elements.manualAgeMonths.value = state.profile.manualAgeMonths;
    updateLanguageToggle();
  }

  function saveProfile() {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(state.profile));
  }

  function loadEntries() {
    const raw = localStorage.getItem(STORAGE_KEYS.entries);
    if (!raw) {
      state.entries = [];
      return;
    }
    try {
      state.entries = JSON.parse(raw);
    } catch (err) {
      state.entries = [];
    }
  }

  function saveEntries() {
    localStorage.setItem(STORAGE_KEYS.entries, JSON.stringify(state.entries));
  }

  function updateMilestoneOptions() {
    const selectedDomain = elements.entryDomain.value;
    const previousSelection = elements.entryMilestone.value;
    const items = state.catalog
      .filter((item) => item.domain === selectedDomain)
      .sort((a, b) => a.age_target_months - b.age_target_months);

    elements.entryMilestone.innerHTML = "";

    items.forEach((item) => {
      const label = `${item.title} (${item.age_target_months} ${t("summary_months_short")})`;
      elements.entryMilestone.appendChild(createOption(item.id, label));
    });

    elements.entryMilestone.appendChild(createOption(MANUAL_OPTION, t("option_manual_entry")));

    const options = Array.from(elements.entryMilestone.options).map((option) => option.value);
    if (previousSelection && options.includes(previousSelection)) {
      elements.entryMilestone.value = previousSelection;
    } else if (items.length) {
      elements.entryMilestone.value = items[0].id;
    } else {
      elements.entryMilestone.value = MANUAL_OPTION;
    }

    toggleManualMilestone();
  }

  function toggleManualMilestone() {
    const isManual = elements.entryMilestone.value === MANUAL_OPTION;
    elements.manualMilestoneWrap.classList.toggle("hidden", !isManual);
    if (!isManual) {
      elements.entryManualMilestone.value = "";
    }
  }

  function saveEntry() {
    if (state.editingId) return;
    const payload = buildEntryPayload(null);
    if (!payload) return;
    const entry = {
      ...payload,
      id: createId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.entries.unshift(entry);
    saveEntries();
    resetEntryForm();
    renderAll();
  }

  function updateEntry() {
    if (!state.editingId) return;
    const idx = state.entries.findIndex((item) => item.id === state.editingId);
    if (idx === -1) return;
    const existing = state.entries[idx];
    const payload = buildEntryPayload(existing);
    if (!payload) return;
    state.entries[idx] = {
      ...existing,
      ...payload,
      id: state.editingId,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };
    saveEntries();
    resetEntryForm();
    renderAll();
  }

  function buildEntryPayload(existingEntry) {
    const selectedMilestone = elements.entryMilestone.value;
    const observedDate = elements.entryDate.value || state.profile.assessmentDate || todayISO();
    const status = elements.entryStatus.value;
    const observer = elements.entryObserver.value.trim();
    const notes = elements.entryNotes.value.trim();

    if (selectedMilestone === MANUAL_OPTION) {
      const manualTitle = elements.entryManualMilestone.value.trim();
      if (!manualTitle) {
        alert(t("alert_manual_title"));
        return null;
      }
      const manualId =
        existingEntry && existingEntry.isManual ? existingEntry.milestoneId : `manual_${createId()}`;
      return {
        milestoneId: manualId,
        milestoneTitle: manualTitle,
        domain: elements.entryDomain.value,
        isManual: true,
        status,
        observedDate,
        observer,
        notes
      };
    }

    const milestone = state.catalog.find((item) => item.id === selectedMilestone);
    if (!milestone) {
      alert(t("alert_select_milestone"));
      return null;
    }

    return {
      milestoneId: milestone.id,
      milestoneTitle: milestone.title,
      domain: milestone.domain,
      isManual: false,
      status,
      observedDate,
      observer,
      notes
    };
  }

  function resetEntryForm() {
    state.editingId = null;
    elements.updateEntryBtn.disabled = true;
    elements.saveEntryBtn.disabled = false;
    elements.editNotice.classList.add("hidden");

    const fallbackDate = state.profile.assessmentDate || todayISO();
    elements.entryDate.value = fallbackDate;
    elements.entryStatus.value = "achieved";
    elements.entryObserver.value = "";
    elements.entryNotes.value = "";
    elements.entryManualMilestone.value = "";
    updateMilestoneOptions();
  }

  function setEditing(entry) {
    state.editingId = entry.id;
    elements.updateEntryBtn.disabled = false;
    elements.saveEntryBtn.disabled = true;
    elements.editNotice.classList.remove("hidden");

    elements.entryDomain.value = entry.domain;
    updateMilestoneOptions();
    const hasCatalogMatch = state.catalog.some((item) => item.id === entry.milestoneId);
    const isManual = entry.isManual || !hasCatalogMatch;
    if (isManual) {
      elements.entryMilestone.value = MANUAL_OPTION;
      elements.entryManualMilestone.value = entry.milestoneTitle;
    } else {
      elements.entryMilestone.value = entry.milestoneId;
      elements.entryManualMilestone.value = "";
    }
    toggleManualMilestone();
    elements.entryDate.value = entry.observedDate;
    elements.entryStatus.value = entry.status;
    elements.entryObserver.value = entry.observer || "";
    elements.entryNotes.value = entry.notes || "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearLog() {
    if (!confirm(t("confirm_clear_log"))) return;
    state.entries = [];
    saveEntries();
    renderAll();
  }

  function renderAll() {
    renderProfile();
    renderSummary();
    renderCatalog();
    renderUpcoming();
    renderLog();
  }

  function renderProfile() {
    const ageDays = computeAgeDays(state.profile.birthDate, state.profile.assessmentDate);
    const manualAge = parseNumber(state.profile.manualAgeMonths);
    const ageMonths = Number.isFinite(manualAge) ? manualAge : computeAgeMonths(ageDays);

    elements.ageMonths.textContent = Number.isFinite(ageMonths) ? ageMonths.toFixed(1) : "--";
    elements.ageDays.textContent = Number.isFinite(ageDays) ? String(ageDays) : "--";
    elements.totalEntries.textContent = String(state.entries.length);
  }

  function renderSummary() {
    const counts = countStatuses(state.entries);
    elements.countAchieved.textContent = String(counts.achieved);
    elements.countEmerging.textContent = String(counts.emerging);
    elements.countNotYet.textContent = String(counts.notYet);
    elements.countTotal.textContent = String(state.entries.length);

    if (!state.entries.length) {
      elements.summarySubtitle.textContent = t("summary_no_entries");
      return;
    }

    const last = [...state.entries].sort((a, b) => {
      return (b.updatedAt || "").localeCompare(a.updatedAt || "");
    })[0];

    const name = state.profile.childName || t("summary_name_fallback");
    elements.summarySubtitle.textContent = t("summary_last_update", {
      date: last.observedDate || "",
      name
    });
  }

  function renderCatalog() {
    const items = getFilteredCatalog();
    elements.catalogList.innerHTML = "";
    elements.catalogEmpty.classList.toggle("hidden", items.length !== 0);
    elements.catalogEmpty.textContent = t("catalog_no_results");

    const currentAge = getCurrentAgeMonths();

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "catalog-item";

      const title = document.createElement("h3");
      title.textContent = item.title;

      const meta = document.createElement("div");
      meta.className = "catalog-meta";

      const domainTag = document.createElement("span");
      domainTag.className = "tag teal";
      domainTag.textContent = getDomainLabel(item.domain);

      const ageTag = document.createElement("span");
      ageTag.className = "tag gold";
      ageTag.textContent = `${item.age_min_months}-${item.age_max_months} ${t("summary_months_short")}`;

      const status = getAgeStatus(currentAge, item);
      const statusWrap = document.createElement("span");
      statusWrap.className = `status-dot ${status.className}`;
      const dot = document.createElement("span");
      const label = document.createElement("span");
      label.textContent = status.label;
      statusWrap.appendChild(dot);
      statusWrap.appendChild(label);

      const support = document.createElement("div");
      support.className = "catalog-support";
      support.textContent = `${t("label_support_tip")}: ${item.support_tip}`;

      const expectNext = document.createElement("div");
      expectNext.className = "catalog-support";
      expectNext.textContent = `${t("label_expect_next")}: ${item.expect_next}`;

      const actionRow = document.createElement("div");
      actionRow.className = "button-row";

      const addBtn = document.createElement("button");
      addBtn.textContent = t("button_add_to_log");
      addBtn.addEventListener("click", () => {
        elements.entryDomain.value = item.domain;
        updateMilestoneOptions();
        elements.entryMilestone.value = item.id;
        toggleManualMilestone();
        elements.entryDate.value = state.profile.assessmentDate || todayISO();
        elements.entryStatus.value = "achieved";
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      meta.appendChild(domainTag);
      meta.appendChild(ageTag);
      meta.appendChild(statusWrap);

      actionRow.appendChild(addBtn);

      card.appendChild(title);
      card.appendChild(meta);
      card.appendChild(support);
      card.appendChild(expectNext);
      card.appendChild(actionRow);

      elements.catalogList.appendChild(card);
    });
  }

  function renderUpcoming() {
    const currentAge = getCurrentAgeMonths();
    const achievedIds = new Set(
      state.entries.filter((entry) => entry.status === "achieved").map((entry) => entry.milestoneId)
    );

    let upcoming = state.catalog.filter((item) => !achievedIds.has(item.id));
    upcoming.sort((a, b) => a.age_target_months - b.age_target_months);

    if (Number.isFinite(currentAge)) {
      upcoming = upcoming.filter((item) => {
        return item.age_target_months >= currentAge - 1 && item.age_target_months <= currentAge + 4;
      });
    }

    const list = upcoming.slice(0, 5);
    elements.upcomingList.innerHTML = "";
    if (!Number.isFinite(currentAge)) {
      elements.upcomingEmpty.textContent = t("upcoming_no_age");
      elements.upcomingEmpty.classList.remove("hidden");
      return;
    }

    if (!list.length) {
      elements.upcomingEmpty.textContent = t("upcoming_none");
      elements.upcomingEmpty.classList.remove("hidden");
      return;
    }

    elements.upcomingEmpty.classList.add("hidden");

    list.forEach((item) => {
      const card = document.createElement("div");
      card.className = "upcoming-card";

      const title = document.createElement("h4");
      title.textContent = `${item.title} (${item.age_target_months} ${t("summary_months_short")})`;

      const domain = document.createElement("div");
      domain.className = "tag";
      domain.textContent = getDomainLabel(item.domain);

      const support = document.createElement("div");
      support.className = "catalog-support";
      support.textContent = `${t("label_support_tip")}: ${item.support_tip}`;

      const expect = document.createElement("div");
      expect.className = "catalog-support";
      expect.textContent = `${t("label_expect_next")}: ${item.expect_next}`;

      card.appendChild(title);
      card.appendChild(domain);
      card.appendChild(support);
      card.appendChild(expect);

      elements.upcomingList.appendChild(card);
    });
  }

  function renderLog() {
    const filtered = getFilteredEntries();
    elements.logTableBody.innerHTML = "";
    elements.logEmpty.classList.toggle("hidden", filtered.length !== 0);
    elements.logEmpty.textContent = t("log_empty");

    filtered.forEach((entry) => {
      const row = document.createElement("tr");

      row.appendChild(createCell(entry.milestoneTitle));
      row.appendChild(createCell(getDomainLabel(entry.domain)));
      row.appendChild(createCell(formatStatus(entry.status)));
      row.appendChild(createCell(entry.observedDate || ""));
      row.appendChild(createCell(formatAgeAtDate(entry.observedDate)));
      row.appendChild(createCell(entry.observer || ""));

      const actions = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.textContent = t("button_edit");
      editBtn.addEventListener("click", () => setEditing(entry));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = t("button_delete");
      deleteBtn.className = "ghost";
      deleteBtn.addEventListener("click", () => deleteEntry(entry.id));

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      actions.style.display = "flex";
      actions.style.gap = "6px";

      row.appendChild(actions);
      elements.logTableBody.appendChild(row);
    });
  }

  function deleteEntry(id) {
    if (!confirm(t("confirm_delete_entry"))) return;
    state.entries = state.entries.filter((entry) => entry.id !== id);
    saveEntries();
    renderAll();
  }

  function getFilteredCatalog() {
    const search = normalize(elements.catalogSearch.value);
    const domain = elements.catalogDomainFilter.value;
    const ageFilter = elements.catalogAgeFilter.value;

    return state.catalog.filter((item) => {
      if (domain !== "all" && item.domain !== domain) return false;
      if (search) {
        const haystack = `${item.title} ${item.support_tip} ${item.expect_next}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      if (ageFilter !== "all") {
        const [min, max] = ageFilter.split("-").map((value) => Number(value));
        if (Number.isFinite(min) && Number.isFinite(max)) {
          if (item.age_target_months < min || item.age_target_months > max) return false;
        }
      }
      return true;
    });
  }

  function getFilteredEntries() {
    const search = normalize(elements.logSearch.value);
    const domain = elements.logDomainFilter.value;
    const status = elements.logStatusFilter.value;

    return [...state.entries]
      .filter((entry) => {
        if (domain !== "all" && entry.domain !== domain) return false;
        if (status !== "all" && entry.status !== status) return false;
        if (!search) return true;
        const haystack = `${entry.milestoneTitle} ${entry.notes} ${entry.observer}`.toLowerCase();
        return haystack.includes(search);
      })
      .sort((a, b) => {
        return (b.observedDate || "").localeCompare(a.observedDate || "");
      });
  }

  function getCurrentAgeMonths() {
    const manual = parseNumber(state.profile.manualAgeMonths);
    if (Number.isFinite(manual)) return manual;

    const ageDays = computeAgeDays(state.profile.birthDate, state.profile.assessmentDate);
    return computeAgeMonths(ageDays);
  }

  function getAgeStatus(currentAge, item) {
    if (!Number.isFinite(currentAge)) {
      return { label: t("status_age_not_set"), className: "" };
    }
    if (currentAge < item.age_min_months) {
      return { label: t("status_upcoming"), className: "status-upcoming" };
    }
    if (currentAge <= item.age_max_months) {
      return { label: t("status_in_range"), className: "status-range" };
    }
    return { label: t("status_past"), className: "status-past" };
  }

  function countStatuses(entries) {
    return entries.reduce(
      (acc, entry) => {
        if (entry.status === "achieved") acc.achieved += 1;
        if (entry.status === "emerging") acc.emerging += 1;
        if (entry.status === "not_yet") acc.notYet += 1;
        return acc;
      },
      { achieved: 0, emerging: 0, notYet: 0 }
    );
  }

  function formatStatus(status) {
    if (status === "achieved") return t("status_achieved");
    if (status === "emerging") return t("status_emerging");
    if (status === "not_yet") return t("status_not_yet");
    return status || "";
  }

  function formatAgeAtDate(date) {
    if (!state.profile.birthDate || !date) return "--";
    const ageDays = computeAgeDays(state.profile.birthDate, date);
    const ageMonths = computeAgeMonths(ageDays);
    return Number.isFinite(ageMonths) ? ageMonths.toFixed(1) : "--";
  }

  function exportLogCSV() {
    if (!state.entries.length) {
      alert(t("alert_no_entries_export"));
      return;
    }

    const header = [
      "child_name",
      "milestone_id",
      "milestone_title",
      "domain",
      "status",
      "observed_date",
      "age_months",
      "observer",
      "notes"
    ];

    const rows = state.entries.map((entry) => {
      const age = formatAgeAtDate(entry.observedDate);
      return [
        state.profile.childName,
        entry.milestoneId,
        entry.milestoneTitle,
        entry.domain,
        entry.status,
        entry.observedDate,
        age,
        entry.observer,
        entry.notes
      ];
    });

    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    downloadFile("milestone_log.csv", csv, "text/csv");
  }

  function exportSummaryText() {
    const text = buildSummaryText();
    downloadFile("milestone_summary.txt", text, "text/plain");
  }

  async function copySummaryText() {
    const text = buildSummaryText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      alert(t("alert_summary_copied"));
      return;
    }
    prompt(t("prompt_copy_summary"), text);
  }

  function buildSummaryText() {
    const counts = countStatuses(state.entries);
    const name = state.profile.childName || t("summary_name_fallback");
    const age = getCurrentAgeMonths();
    const labels = getTranslations(state.uiLanguage);
    const ageText = Number.isFinite(age)
      ? `${age.toFixed(1)} ${labels.summary_months_label}`
      : labels.summary_age_not_set;
    const lines = [
      `${labels.summary_title_prefix} ${name}`,
      `${labels.summary_age_label}: ${ageText}`,
      `${labels.summary_total_label}: ${state.entries.length}`,
      `${labels.summary_achieved_label}: ${counts.achieved}`,
      `${labels.summary_emerging_label}: ${counts.emerging}`,
      `${labels.summary_not_yet_label}: ${counts.notYet}`
    ];

    const upcoming = getUpcomingSummary();
    if (upcoming.length) {
      lines.push("", `${labels.summary_upcoming_label}:`);
      upcoming.forEach((item) => {
        lines.push(
          `- ${item.title} (${item.age_target_months} ${labels.summary_months_short}) | ${getDomainLabel(item.domain)}`
        );
      });
    }

    return lines.join("\n");
  }

  function getUpcomingSummary() {
    const currentAge = getCurrentAgeMonths();
    if (!Number.isFinite(currentAge)) return [];

    const achievedIds = new Set(
      state.entries.filter((entry) => entry.status === "achieved").map((entry) => entry.milestoneId)
    );

    return state.catalog
      .filter((item) => !achievedIds.has(item.id))
      .filter((item) => item.age_target_months >= currentAge - 1 && item.age_target_months <= currentAge + 4)
      .sort((a, b) => a.age_target_months - b.age_target_months)
      .slice(0, 3);
  }

  function parseCatalogCSV(text) {
    const rows = parseCSV(text);
    if (!rows.length) throw new Error(t("error_csv_empty"));

    const headers = rows[0].map((h) => h.trim());
    const required = [
      "id",
      "domain",
      "title",
      "age_min_months",
      "age_target_months",
      "age_max_months",
      "support_tip",
      "expect_next"
    ];

    required.forEach((key) => {
      if (!headers.includes(key)) throw new Error(t("error_csv_missing_column", { column: key }));
    });

    const items = rows.slice(1).filter((row) => row.some((cell) => cell.trim() !== ""));

    return items.map((row, index) => {
      const entry = {};
      headers.forEach((key, idx) => {
        entry[key] = row[idx] ? row[idx].trim() : "";
      });

      const ageMin = parseNumber(entry.age_min_months);
      const ageTarget = parseNumber(entry.age_target_months);
      const ageMax = parseNumber(entry.age_max_months);

      if (!entry.id || !entry.domain || !entry.title) {
        throw new Error(t("error_csv_missing_fields", { row: index + 2 }));
      }

      if (!DOMAIN_KEYS[entry.domain]) {
        throw new Error(t("error_csv_invalid_domain", { row: index + 2, domain: entry.domain }));
      }

      if (!Number.isFinite(ageMin) || !Number.isFinite(ageTarget) || !Number.isFinite(ageMax)) {
        throw new Error(t("error_csv_invalid_age", { row: index + 2 }));
      }

      return {
        id: entry.id,
        domain: entry.domain,
        title: entry.title,
        age_min_months: ageMin,
        age_target_months: ageTarget,
        age_max_months: ageMax,
        support_tip: entry.support_tip || "",
        expect_next: entry.expect_next || ""
      };
    });
  }

  function parseCSV(text) {
    const rows = [];
    let current = "";
    let row = [];
    let inQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      const next = text[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (char === "," && !inQuotes) {
        row.push(current);
        current = "";
        continue;
      }

      if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") {
          i += 1;
        }
        row.push(current);
        rows.push(row);
        row = [];
        current = "";
        continue;
      }

      current += char;
    }

    if (current.length || row.length) {
      row.push(current);
      rows.push(row);
    }

    return rows.map((r) => r.map((cell) => cell.trim()));
  }

  function csvEscape(value) {
    const text = String(value ?? "");
    if (/[",\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }
    return text;
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function normalizeLanguage(value) {
    const normalized = String(value || "").toLowerCase();
    return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE;
  }

  function parseNumber(value) {
    const num = Number(value);
    return Number.isFinite(num) ? num : NaN;
  }

  function computeAgeDays(birthISO, assessmentISO) {
    if (!birthISO || !assessmentISO) return NaN;
    const birth = new Date(`${birthISO}T00:00:00`);
    const assess = new Date(`${assessmentISO}T00:00:00`);
    const diff = Math.round((assess - birth) / 86400000);
    return Number.isFinite(diff) ? diff : NaN;
  }

  function computeAgeMonths(ageDays) {
    if (!Number.isFinite(ageDays)) return NaN;
    return ageDays / 30.4375;
  }

  function todayISO() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function createId() {
    return `entry_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
  }

  function createOption(value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    return option;
  }

  function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text || "";
    return cell;
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
})();
