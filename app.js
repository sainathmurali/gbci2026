/**
 * Poster #105: Beyond Hemispheric Laterality
 * 10th Graz Brain-Computer Interface Conference 2026
 *
 * Core Client Engine:
 * - Parallax Scrollytelling & Spotlight IntersectionObserver
 * - Interactive Hotspot to Narrative Section Jump Navigation
 * - Apple HIG Glossary Engine with Foundation Diagrams
 * - Two-Way Live Attendee-Author Messenger Portal
 * - Figure Lightbox Inspection & Full PDF Reader Modals
 */

document.addEventListener("DOMContentLoaded", () => {
  // ===========================================================================
  // 1. Term Definitions & Foundation Diagrams Mapping
  // ===========================================================================
  const termDefinitions = {
    "bci-illiteracy": {
      name: "BCI Illiteracy",
      category: "Behavioral Phenomenon",
      plain: "Failure to achieve reliable BCI control despite training. Approximately 10–30% of users fail to achieve reliable MI-BCI control.",
      math: "\\text{MI-BCI Inefficiency: } \\sim 10\\text{--}30\\% \\text{ of users fail to achieve reliable control}",
      imgSrc: "/assets/figures/zich_2015_illiteracy.jpg",
      caption: "Simultaneous EEG-fMRI recordings contrasting a literate user (top) showing distinct contralateral SMR ERD and localized motor cortex fMRI activation versus an illiterate user (bottom) showing absent ERD and lack of focal sensorimotor engagement during motor imagery. Adapted from Zich et al. (2015).",
      significance: "Variability in user performance often exceeds differences between decoding algorithms. Control is increasingly recognized as a learnable cognitive-motor skill."
    },
    "smr-erd": {
      name: "Sensorimotor Rhythms (SMR) & ERD",
      category: "Electrophysiology",
      plain: "Motor imagery produces characteristic modulations of sensorimotor rhythms, particularly in the mu (8–13 Hz) and beta (13–30 Hz) bands.",
      math: "\\mu \\text{ (8--13 Hz)} \\quad \\text{and} \\quad \\beta \\text{ (13--30 Hz)} \\quad \\text{Sensorimotor Rhythms (SMR)}",
      imgSrc: "/assets/figures/zich_2015_erd.jpg",
      caption: "Topographical distribution of event-related desynchronization (ERD) over contralateral sensorimotor areas during motor imagery. Adapted from Zich et al. (2015).",
      significance: "Traditional MI-BCI paradigms evaluate user control through localized event-related desynchronization (ERD) in sensorimotor rhythms."
    },
    "hemispheric-laterality": {
      name: "Hemispheric Laterality",
      category: "Neurophysiology",
      plain: "Contralateral sensorimotor activation during motor execution and imagination, where left-hand tasks activate the right hemisphere and right-hand tasks activate the left hemisphere.",
      math: "\\text{Laterality Index (LI)} = \\frac{\\text{Contralateral} - \\text{Ipsilateral}}{\\text{Contralateral} + \\text{Ipsilateral}}",
      imgSrc: "/assets/figures/zich_2015_laterality.jpg",
      caption: "Cortical surface activation maps demonstrating contralateral sensorimotor laterality during movement execution and motor imagery. Adapted from Zich et al. (2015).",
      significance: "While traditional MI-BCI research focuses heavily on left–right hemispheric laterality, Riemannian geometry reveals that within-class stability and rest distinctiveness are equally crucial determinants of learning."
    },
    "riemannian-metrics": {
      name: "Riemannian Neural Metrics",
      category: "Manifold Geometry",
      plain: "Classifier-independent metrics based on the covariance structure of multichannel EEG, quantifying class distinctiveness, class stability, and rest distinctiveness.",
      math: "\\mathbf{C} \\in \\mathcal{S}_{++}^n \\quad \\longrightarrow \\quad \\{\\text{classDis}, \\; \\text{classStab}, \\; \\text{restDis}\\}",
      imgSrc: "/assets/figures/aps_fig4_riemannian_manifold.png",
      caption: "Representation of metrics on the Riemannian manifold (S++^n): Class Distinctiveness (Left ↔ Right), Class Stability (within-class consistency), and Rest Distinctiveness (MI ↔ Baseline separation).",
      significance: "Directly evaluates the geometry of multichannel EEG covariance, providing a physiologically interpretable description of neural adaptation during MI-BCI training beyond classifier accuracy."
    },
    "pseudo-illiteracy": {
      name: "Pseudo-Illiteracy (EEG-fMRI Discrepancy)",
      category: "Literature Context",
      plain: "A phenomenon reported in multimodal studies (Zich et al., 2015) where individuals show sensorimotor activation on fMRI despite weak scalp EEG ERD.",
      math: "\\Delta\\text{BOLD} > 0, \\quad \\Delta\\text{ERD} \\approx 0",
      imgSrc: "/assets/figures/zich_2015_illiteracy.jpg",
      caption: "Simultaneous EEG-fMRI investigation showing dissociation between metabolic fMRI activation and scalp EEG sensorimotor rhythms. Adapted from Zich et al. (2015).",
      significance: "Illustrates the limitations of single-electrode or scalp power measures in capturing motor imagery engagement."
    },
    "riemannian-manifold": {
      name: "Riemannian Manifold (S++^n)",
      category: "Differential Geometry",
      plain: "A smooth, curved mathematical manifold inhabited by n x n symmetric positive-definite (SPD) matrices. Spatial covariance matrices estimated from multichannel EEG naturally lie on this curved cone rather than flat Euclidean space.",
      math: "\\mathcal{S}_{++}^n = \\{ \\mathbf{C} \\in \\mathbb{R}^{n \\times n} : \\mathbf{C} = \\mathbf{C}^T, \\; \\mathbf{x}^T \\mathbf{C} \\mathbf{x} > 0 \\; \\forall \\mathbf{x} \\neq 0 \\}",
      imgSrc: "/assets/figures/aps_fig4_riemannian_manifold.png",
      caption: "3D conceptual depiction of the Riemannian manifold of SPD matrices, showing geodesic shortest paths, Fréchet centroids, and cluster dispersions.",
      significance: "Direct manifold computation prevents geometric distortion ('swelling effect' of Euclidean averaging), eliminates arbitrary electrode selection, and natively preserves spatial sensor dependencies."
    },
    "riemannian-distance": {
      name: "Affine-Invariant Riemannian Metric (AIRM / δ_R)",
      category: "Differential Geometry",
      plain: "The geodesic distance (length of the unique shortest path) connecting two covariance matrices along the curved Riemannian manifold surface.",
      math: "\\delta_R(\\mathbf{C}_1, \\mathbf{C}_2) = \\|\\log(\\mathbf{C}_1^{-1/2} \\mathbf{C}_2 \\mathbf{C}_1^{-1/2})\\|_F = \\left( \\sum_{i=1}^n \\ln^2 \\lambda_i(\\mathbf{C}_1^{-1} \\mathbf{C}_2) \\right)^{1/2}",
      imgSrc: "/assets/figures/aps_fig4_riemannian_manifold.png",
      caption: "Geodesic shortest path on the manifold, invariant to linear coordinate transformations.",
      significance: "The AIRM is invariant to affine transformations C -> W C W^T. This confers mathematical immunity to electrode gain variations, head movements, and channel impedance changes."
    },
    "geometric-mean": {
      name: "Riemannian Geometric Mean (Fréchet Mean)",
      category: "Differential Geometry",
      plain: "The true center of mass for a set of covariance matrices on the manifold, defined as the point that minimizes the sum of squared Riemannian geodesic distances to all matrices in the set.",
      math: "\\bar{\\mathbf{C}} = \\arg\\min_{\\mathbf{C} \\in \\mathcal{S}_{++}^n} \\sum_{i=1}^N \\delta_R^2(\\mathbf{C}, \\mathbf{C}_i)",
      imgSrc: "/assets/figures/aps_fig4_riemannian_manifold.png",
      caption: "Iterative Riemannian Fréchet mean estimation for class prototypes on the curved manifold.",
      significance: "Forms the prototype center for Left Hand, Right Hand, and Rest states. Unlike Euclidean means, the Riemannian mean preserves positive-definiteness and determinant properties."
    },
    "class-distinctiveness": {
      name: "Class Distinctiveness (classDis)",
      category: "Riemannian Neural Metric",
      plain: "Quantifies how far apart the neural representations of Left-Hand and Right-Hand motor imagery are on the manifold, normalized by the internal trial dispersion of both classes.",
      math: "\\text{classDis}(L, R) = \\frac{\\delta_R(\\bar{\\mathbf{C}}_L, \\bar{\\mathbf{C}}_R)}{\\frac{1}{2}(\\sigma_L + \\sigma_R)} \\quad \\text{where} \\; \\sigma_k = \\frac{1}{|\\mathcal{C}_k|} \\sum_{i \\in \\mathcal{C}_k} \\delta_R^2(\\mathbf{C}_i, \\bar{\\mathbf{C}}_k)",
      imgSrc: "/assets/figures/aps_fig4_riemannian_manifold.png",
      caption: "Class Distinctiveness: Geodesic separation between class prototypes normalized by within-class spread.",
      significance: "PARADOXICAL BREAKTHROUGH: Both Improved and Worsened groups showed increasing Left-Right distinctiveness over runs! This proves that increasing class separability alone does not guarantee learning."
    },
    "class-stability": {
      name: "Class Stability (classStab)",
      category: "Riemannian Neural Metric",
      plain: "Measures how consistently a user reproduces the exact same spatial covariance pattern across repeated trials of the same motor imagery task (inverse of within-class dispersion).",
      math: "\\text{classStab}(k) = \\frac{1}{1 + \\sigma_k} \\quad \\text{where} \\; \\sigma_k = \\frac{1}{|\\mathcal{C}_k|} \\sum_{i \\in \\mathcal{C}_k} \\delta_R^2(\\mathbf{C}_i, \\bar{\\mathbf{C}}_k)",
      imgSrc: "/assets/figures/aps_fig4_riemannian_manifold.png",
      caption: "Class Stability: Tightly clustered trial points on the manifold reflect high trial-to-trial reproducibility.",
      significance: "High stability gives algorithmic decoders a stationary, dependable target. Learners in the Improved cohort exhibited strong positive slopes in stability, whereas deteriorating learners grew increasingly erratic."
    },
    "rest-distinctiveness": {
      name: "Rest Distinctiveness (restDis)",
      category: "Riemannian Neural Metric",
      plain: "Measures the Riemannian geodesic distance between active motor imagery task trials and the user's pre-cue resting baseline covariance, normalized by dispersion.",
      math: "\\text{restDis}(k) = \\frac{\\delta_R(\\bar{\\mathbf{C}}_k, \\mathbf{C}_{rest})}{\\frac{1}{2}(\\sigma_k + \\sigma_{rest})}",
      imgSrc: "/assets/figures/aps_fig4_riemannian_manifold.png",
      caption: "Rest Distinctiveness: Quantifies neural divergence from the pre-cue idle resting state.",
      significance: "Critical finding: In the Worsened group, task-to-rest divergence collapsed across runs even while left-right separation widened. Worsened participants lost the ability to disengage from rest."
    },
    "pre-cue-baseline": {
      name: "Pre-Cue Resting Reference ([-1.99 s, 0 s])",
      category: "Experimental Protocol",
      plain: "The brief resting window immediately preceding each trial's visual cue, used as the local rest baseline instead of a separate continuous resting recording.",
      math: "t \\in [-1.99, 0.0] \\text{ s relative to cue onset}",
      imgSrc: "/assets/figures/aps_fig3_mi_task_paradigm.png",
      caption: "Trial timeline: 2 s pre-cue fixation, 3 s kinesthetic motor imagery window, and variable 4.1–4.8 s inter-trial interval.",
      significance: "Adopted following Lotte & Jeunet (2018). Isolates dynamic trial-by-trial task engagement while eliminating the long-duration physiological drift inherent in separate rest sessions."
    },
    "difficulty-index": {
      name: "BCI Difficulty Index (DI)",
      category: "Behavioral Stratification",
      plain: "A normalized behavioral index calculated from participants' self-reported difficulty ratings collected across consecutive training runs.",
      math: "\\text{DI}_r = \\frac{\\text{Rating}_r - \\min(\\text{Rating})}{\\max(\\text{Rating}) - \\min(\\text{Rating})}",
      imgSrc: "/assets/figures/fig1.jpg",
      caption: "Figure 1: Self-reported expected performance trajectories and Difficulty Index progression across runs.",
      significance: "Revealed an intriguing dissociation: perceived mental effort does not correlate linearly with neural decodability or objective learning trajectory."
    },
    "asr": {
      name: "Artifact Subspace Reconstruction (ASR)",
      category: "Signal Preprocessing",
      plain: "An adaptive statistical method that detects and removes high-amplitude artifacts (e.g. eye blinks, muscle activity) by comparing short data segments against clean baseline calibration statistics in principal component space.",
      math: "\\mathbf{y}_{clean} = \\mathbf{V} \\mathbf{V}^T \\mathbf{y}_{raw} \\quad (\\text{Reconstructing subspace variance below threshold})",
      imgSrc: "/assets/figures/aps_graphical_abstract.png",
      caption: "Automated EEG preprocessing pipeline integrating bandpass filtering, ICA, and ASR subspace reconstruction.",
      significance: "Ensures that Riemannian covariance matrices reflect true neurogenic oscillations rather than electromyographic or ocular artifact contamination."
    },
    "mdm-classifier": {
      name: "Minimum Distance to Mean (MDM) Classifier",
      category: "Riemannian Decoding",
      plain: "A subject-specific Riemannian classifier that computes geometric class centroids on the manifold and classifies single-trial covariance matrices based on geodesic distance.",
      math: "\\hat{y} = \\arg\\min_{k \\in \\{L, R\\}} \\delta_R(\\mathbf{C}_{\\text{trial}}, \\bar{\\mathbf{C}}_k)",
      imgSrc: "/assets/figures/fig6.jpg",
      caption: "Figure 6: Relationship between MDM classification performance and behavioral learning trends (Pearson r = 0.321, p = 0.034).",
      significance: "Used to determine whether behavioral groups were reflected in decoding performance without relying on ad-hoc spatial filtering parameters."
    },
    "cohens-d": {
      name: "One-vs-Rest (OVR) Cohen's d Effect Size",
      category: "Statistical Analysis",
      plain: "A standardized statistical effect size measuring how many standard deviations a behavioral subgroup's neural metric slope deviates from the remainder of the cohort.",
      math: "d = \\frac{\\mu_{\\text{group}} - \\mu_{\\text{rest}}}{s_{\\text{pooled}}}",
      imgSrc: "/assets/figures/fig5.jpg",
      caption: "Figure 5: Top neural metric slopes distinguishing each behavioral group ranked by OVR Cohen's d.",
      significance: "Identified that broadband stability and alpha rest distinctiveness are the primary neural markers separating successful from unsuccessful BCI learners."
    },
    "kruskal-wallis": {
      name: "Permutation Kruskal-Wallis Test",
      category: "Statistical Analysis",
      plain: "A nonparametric rank-sum test with Monte Carlo permutation resampling (5,000 iterations) used to evaluate whether neural metric slopes differ significantly among behavioral groups without distributional assumptions.",
      math: "H = \\frac{12}{N(N+1)} \\sum_{j=1}^k \\frac{R_j^2}{n_j} - 3(N+1)",
      imgSrc: "/assets/figures/fig4.jpg",
      caption: "Figure 4: Mean slopes of neural adaptation across groups with Holm-corrected post-hoc Mann-Whitney U test p-values.",
      significance: "Ensures statistical validity against non-normal distributions and unequal sample variances inherent in longitudinal EEG training studies."
    },
    "three-metric-coordination": {
      name: "Multidimensional Neural Dynamics",
      category: "Core Finding",
      plain: "MI-BCI learning is associated with changes across multiple dimensions of neural organization, including class stability, class distinctiveness, and rest distinctiveness.",
      math: "\\{\\text{classDis}, \\; \\text{classStab}, \\; \\text{restDis}\\} \\quad \\text{longitudinal adaptation}",
      imgSrc: "/assets/figures/fig2.jpg",
      caption: "Figure 2: Longitudinal trajectories across runs showing different adaptation patterns across behavioral groups.",
      significance: "Tracking multiple dimensions provides a more comprehensive description of neural adaptation during MI-BCI training than hemispheric separability alone."
    },
    "adaptive-neurofeedback": {
      name: "Multidimensional Neurofeedback",
      category: "Future Direction",
      plain: "Future training paradigms could provide trainees feedback targeting not only class separability, but also neural stability and separation from baseline activity.",
      math: "\\text{Target Feedback: } \\{\\text{Separability}, \\; \\text{Stability}, \\; \\text{Rest Divergence}\\}",
      imgSrc: "/assets/figures/aps_graphical_abstract.png",
      caption: "Conceptual architecture for multidimensional manifold-based neurofeedback training systems.",
      significance: "May help assess an individual's ability to generate effective MI signals and provide personalized targets to support learning."
    }
  };

  // ===========================================================================
  // 2. Figure Database for Lightbox Inspection
  // ===========================================================================
  const figureDatabase = {
    fig1: {
      title: "Figure 1: Behavioral Stratification Across 5 Runs",
      tag: "Behavioral Grouping",
      imgSrc: "/assets/figures/fig1.jpg",
      caption: "a) Average self-reported expected MI-BCI performance (%) across 5 runs, categorized into Improved, Unchanged, and Worsened groups. b) Motor imagery difficulty ratings and Difficulty Index trends.",
      takeaways: [
        "Improved learners steadily progressed from ~56% in Run 1 to >72% by Run 5.",
        "Unchanged group maintained stationary performance around 60–62%.",
        "Worsened group began high (~72%) but declined to ~61% by Run 5.",
        "Perceived mental effort did not mirror performance slopes, indicating subjective ease does not equal neural control."
      ]
    },
    fig2: {
      title: "Figure 2: Longitudinal Neural Changes Across Runs",
      tag: "Run-Wise Neural Metric Changes",
      imgSrc: "/assets/figures/fig2.jpg",
      caption: "Run-wise changes in broadband neural metrics across behavioral groups relative to each subject's Run 1 baseline. Lines represent median changes across subjects, and shaded regions indicate SEM across subjects.",
      takeaways: [
        "Improved Group: Showed increasing trends across rest distinctiveness, class stability, and left–right distinctiveness metrics, indicating progressively more separable and consistent motor imagery representations.",
        "Unchanged Group: Showed mild declining trends across class stability and left–right distinctiveness metrics, indicating limited longitudinal improvement in neural representations.",
        "Worsened Group: Showed mild increases in left–right distinctiveness and stability metrics, but decreasing rest distinctiveness, indicating progressively structured representations with reduced separation from baseline neural activity."
      ]
    },
    fig3: {
      title: "Figure 3: Frequency-Specific Neural Correlates",
      tag: "Spectral Analysis",
      imgSrc: "/assets/figures/fig3.jpg",
      caption: "Spearman correlation heatmaps between expected MI-BCI performance and neural metric values across frequency bands for all subjects and behavioral groups (* p < 0.05, ** p < 0.01).",
      takeaways: [
        "Before Stratification: Across runs, correlations strengthened particularly in beta and gamma bands, especially for rest-related distinctiveness and left–right separability.",
        "Improved Group: Showed stronger and more consistent correlations in lower frequency bands.",
        "Unchanged Group: Exhibited weaker and more heterogeneous relationships.",
        "Worsened Group: Correlations were primarily observed in higher frequency bands, suggesting that spectral features alone may not fully explain the decline in performance."
      ]
    },
    fig4: {
      title: "Figure 4: Divergent Neural Adaptation Slopes",
      tag: "Statistical Permutation",
      imgSrc: "/assets/figures/fig4.jpg",
      caption: "Divergent neural adaptation trends across behavioral groups. Subplots show mean slopes of neural metrics across training runs (permutation-based Kruskal-Wallis test with Holm-corrected Mann-Whitney U, p < 0.05).",
      takeaways: [
        "Alpha-band rest distinctiveness (left_rest_alpha and right_rest_alpha) showed positive slopes in the Improved group but negative or near-zero slopes in the Worsened group.",
        "Broadband stability metrics increased in the Improved group but decreased in the Unchanged group.",
        "Left–Right broadband distinctiveness and gamma-band separability increased in the Improved group, but remained stable or decreased in the other groups.",
        "Indicates that improvement in MI is associated with positive neural adaptation across multiple representational dimensions."
      ]
    },
    fig5: {
      title: "Figure 5: Discriminative Neural Signatures (Cohen's d)",
      tag: "OVR Effect Size Ranking",
      imgSrc: "/assets/figures/fig5.jpg",
      caption: "Discriminative neural signatures identified using One-vs-Rest (OVR) analysis. Top neural metric slopes distinguishing each behavioral group, ranked by Cohen's d effect size.",
      takeaways: [
        "Improved Group: Showed strong positive effect sizes for broadband stability and left–right separability, indicating that increased neural consistency and class separability characterize successful learners.",
        "Unchanged Group: Exhibited negative effect sizes for stability and class-separability metrics, suggesting weaker neural structuring despite increased task–rest divergence.",
        "Worsened Group: Showed large negative effect sizes for rest-related alpha and broadband metrics, indicating that reduced separation from baseline activity characterizes declining performance."
      ]
    },
    fig6: {
      title: "Figure 6: Classifier-Based Validation of Behavioral Groups",
      tag: "Riemannian MDM Decoding",
      imgSrc: "/assets/figures/fig6.jpg",
      caption: "Relationship between classifier performance and behavioral learning trends. Left: Distribution of subject-wise MDM classification accuracy across behavioral groups. Right: Positive correlation between classification accuracy and behavioral performance slope (Pearson r = 0.321, p = 0.034).",
      takeaways: [
        "Classification accuracy differed across groups: Improved achieved the highest median accuracy (~81%), compared to Worsened (~69%) and Unchanged (~63%).",
        "Classifier accuracy was positively correlated with behavioral learning slope (Pearson r = 0.321, p = 0.034).",
        "Indicates that stronger behavioral improvement corresponded to greater neural decodability."
      ]
    }
  };

  // ===========================================================================
  // 3. Section Configuration: Camera Focus, Cutouts & Coordinates
  // ===========================================================================
  const sectionConfig = {
    "stage-overview": {
      name: "Overview",
      num: "",
      title: "Overview",
      subtitle: "Full Poster",
      jumpKey: "overview",
      yCenter: 0,
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      isOverview: true,
      frame: null
    },
    "stage-intro": {
      name: "1. Introduction",
      num: "1",
      title: "1. Introduction",
      subtitle: "Background & Problem",
      jumpKey: "intro",
      yCenter: 0.1964,
      clipPath: "inset(10.68% 50.21% 71.40% 0.69% round 12px)",
      frame: { top: "10.68%", left: "0.69%", width: "49.10%", height: "17.92%" }
    },
    "stage-aim": {
      name: "2. Aim & Hypothesis",
      num: "2",
      title: "2. Aim & Hypothesis",
      subtitle: "Research Questions",
      jumpKey: "aim",
      yCenter: 0.3246,
      clipPath: "inset(28.50% 50.81% 63.57% 0.69% round 12px)",
      frame: { top: "28.50%", left: "0.69%", width: "48.50%", height: "7.93%" }
    },
    "stage-method": {
      name: "3. Methodology",
      num: "3",
      title: "3. Methodology",
      subtitle: "Dataset & Pipeline",
      jumpKey: "method",
      yCenter: 0.2382,
      clipPath: "inset(10.68% 2.14% 63.04% 49.82% round 12px)",
      frame: { top: "10.68%", left: "49.82%", width: "48.04%", height: "26.28%" }
    },
    "stage-results": {
      name: "4. Results & Metrics",
      num: "4",
      title: "4. Results",
      subtitle: "Findings & Decoding",
      jumpKey: "results",
      yCenter: 0.6054,
      clipPath: "inset(36.74% 2.15% 15.66% 0.69% round 12px)",
      frame: { top: "36.74%", left: "0.69%", width: "97.16%", height: "47.60%" }
    },
    "stage-conclusion": {
      name: "5. Discussion & Conclusion",
      num: "5",
      title: "5. Discussion & Conclusion",
      subtitle: "Multidimensional Adaptation",
      jumpKey: "conclusion",
      yCenter: 0.9152,
      clipPath: "inset(84.17% 63.80% 1.13% 0.69% round 12px)",
      frame: { top: "84.17%", left: "0.69%", width: "35.51%", height: "14.70%" }
    },
    "stage-references": {
      name: "6. References & PDF",
      num: "6",
      title: "6. References",
      subtitle: "Materials & Authors",
      jumpKey: "references",
      yCenter: 0.9172,
      clipPath: "inset(84.17% 2.14% 0.73% 36.50% round 12px)",
      frame: { top: "84.17%", left: "36.50%", width: "61.36%", height: "15.10%" }
    }
  };

  const stageIds = ["stage-overview", "stage-intro", "stage-aim", "stage-method", "stage-results", "stage-conclusion", "stage-references"];
  let currentStageIndex = 0;
  let isWheelScrollLocked = false;
  let isProgrammaticScrolling = false;
  let programmaticScrollTimer = null;
  let lastWheelJumpTime = 0;

  function endProgrammaticScroll() {
    clearTimeout(programmaticScrollTimer);
    programmaticScrollTimer = setTimeout(() => {
      isProgrammaticScrolling = false;
    }, 120);
  }

  window.addEventListener("scroll", () => {
    if (isProgrammaticScrolling) {
      endProgrammaticScroll();
    }
  }, { passive: true });

  window.addEventListener("scrollend", () => {
    isProgrammaticScrolling = false;
  });

  // DOM Elements
  const stages = document.querySelectorAll(".section-scroll-stage");
  const jumpPills = document.querySelectorAll(".jump-pill");
  const stepperDots = document.querySelectorAll(".stepper-pill-dot");
  const posterSharpMask = document.getElementById("poster-sharp-mask");
  const posterHighlightFrame = document.getElementById("poster-highlight-frame");

  // Floating Apple Capsule & Sheet Modal Elements
  const floatingSectionCapsule = document.getElementById("floating-section-capsule");
  const btnCapsulePrev = document.getElementById("btn-capsule-prev");
  const btnCapsuleNext = document.getElementById("btn-capsule-next");
  const capsuleStepBadge = document.getElementById("capsule-step-badge");
  const capsuleTitle = document.getElementById("capsule-title");
  const capsuleSubtitle = document.getElementById("capsule-subtitle");
  const btnKnowMore = document.getElementById("btn-know-more");
  const frameKnowMoreBadge = document.getElementById("frame-know-more-badge");

  const sectionDetailModal = document.getElementById("section-detail-modal");
  const sheetModalNum = document.getElementById("sheet-modal-num");
  const sheetModalTag = document.getElementById("sheet-modal-tag");
  const sheetModalTitle = document.getElementById("sheet-modal-title");
  const sheetModalBody = document.getElementById("sheet-modal-body");
  const btnCloseSectionModal = document.getElementById("btn-close-section-modal");

  // ===========================================================================
  // 4. Parallax Section State Controller
  // ===========================================================================
  function getHeaderHeight() {
    const header = document.querySelector(".site-header");
    return header ? header.offsetHeight : 64;
  }

  function updatePosterPosition(stageId) {
    const config = sectionConfig[stageId];
    if (!config) return;
    const canvas = document.getElementById("fullscreen-poster-canvas");
    const stage = document.getElementById("parallax-poster-stage");
    if (!canvas) return;

    const headerHeight = getHeaderHeight();
    const W = stage ? stage.clientWidth : window.innerWidth;
    const H = stage ? stage.clientHeight : window.innerHeight;
    const H_poster = W * (4681 / 3312);
    const availableH = H - headerHeight;

    if (config.isOverview) {
      // Landing page: ensure entire poster starts cleanly below header, never going under
      canvas.style.transform = `translateY(${headerHeight}px)`;
      return;
    }

    if (H_poster <= availableH) {
      // Shorter than available vertical viewport (e.g. mobile portrait):
      // Keep entire poster visible below header without shifting up into the header
      canvas.style.transform = `translateY(${headerHeight}px)`;
    } else {
      // Taller than viewport (desktop or short screens): smoothly frame the target section
      const yTarget = headerHeight + (availableH / 2);
      const yPixel = config.yCenter * H_poster;
      const minTranslate = H - H_poster; // bottom bound
      const maxTranslate = headerHeight; // top bound: never push top of poster under header!
      const clampedTranslateY = Math.max(minTranslate, Math.min(maxTranslate, yTarget - yPixel));
      canvas.style.transform = `translateY(${clampedTranslateY}px)`;
    }
  }

  function setActiveStage(stageId, smoothScroll = false) {
    const config = sectionConfig[stageId];
    if (!config) return;

    currentStageIndex = stageIds.indexOf(stageId);

    // If cards were minimized via peek handle, restore normal view for incoming section
    document.querySelectorAll(".floating-glass-card.card-minimized").forEach(c => c.classList.remove("card-minimized"));
    document.querySelectorAll(".btn-peek-poster.active").forEach(b => {
      b.classList.remove("active");
      const span = b.querySelector("span");
      if (span) span.textContent = "Peek";
    });

    // 1. Poster fills horizontal space; vertical framing centers the active section
    updatePosterPosition(stageId);

    // 2. Update Sharp Cutout Mask: only this section is sharp, rest is blurred
    if (posterSharpMask) {
      posterSharpMask.style.clipPath = config.clipPath;
    }

    // 3. Update Glowing Highlight Frame
    if (posterHighlightFrame) {
      if (config.frame) {
        posterHighlightFrame.style.top = config.frame.top;
        posterHighlightFrame.style.left = config.frame.left;
        posterHighlightFrame.style.width = config.frame.width;
        posterHighlightFrame.style.height = config.frame.height;
        posterHighlightFrame.style.opacity = "1";
      } else {
        posterHighlightFrame.style.opacity = "0";
      }
    }

    // 4. Update Active Stage & Glass Card visibility
    stages.forEach(stg => {
      if (stg.id === stageId) {
        stg.classList.add("active");
      } else {
        stg.classList.remove("active");
      }
    });

    // 5. Update Navigation Jump Pills in header
    jumpPills.forEach(pill => {
      if (pill.getAttribute("data-jump") === config.jumpKey) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    // 6. Update Floating Stepper Capsule dots
    stepperDots.forEach(dot => {
      if (dot.getAttribute("data-step") === config.jumpKey) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // 7. Update Floating Apple Section Capsule Controller
    if (floatingSectionCapsule) {
      if (config.isOverview) {
        floatingSectionCapsule.classList.add("hidden");
      } else {
        floatingSectionCapsule.classList.remove("hidden");
        if (capsuleStepBadge) capsuleStepBadge.textContent = config.num;
        if (capsuleTitle) capsuleTitle.textContent = config.title;
        if (capsuleSubtitle) capsuleSubtitle.textContent = config.subtitle;
        if (btnCapsulePrev) btnCapsulePrev.disabled = (currentStageIndex <= 1);
        if (btnCapsuleNext) btnCapsuleNext.disabled = (currentStageIndex >= stageIds.length - 1);
      }
    }

    // Smooth scroll if requested
    if (smoothScroll) {
      isProgrammaticScrolling = true;
      clearTimeout(programmaticScrollTimer);
      programmaticScrollTimer = setTimeout(() => {
        isProgrammaticScrolling = false;
      }, 900);

      const targetEl = document.getElementById(stageId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  function jumpToStageIndex(idx) {
    if (idx < 0 || idx >= stageIds.length) return;
    setActiveStage(stageIds[idx], true);
  }

  // ===========================================================================
  // 5. Scroll Observation & Direct Section Jumping
  // ===========================================================================
  const stageObserverOptions = {
    root: null,
    rootMargin: "-25% 0px -35% 0px",
    threshold: 0.2
  };

  const stageObserver = new IntersectionObserver((entries) => {
    if (isProgrammaticScrolling) return; // MUTE while programmatic scroll is animating!
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveStage(entry.target.id, false);
      }
    });
  }, stageObserverOptions);

  stages.forEach(stg => stageObserver.observe(stg));

  // Apple-style Direct Section Jumping on Mouse Wheel / Trackpad Scroll
  let wheelAccumulator = 0;
  let wheelTimer = null;

  window.addEventListener("wheel", (e) => {
    // Let modal scroll naturally if open
    if (document.querySelector(".modal-overlay.active")) return;
    // On small mobile screens, allow natural touch scrolling
    if (window.innerWidth <= 960) return;

    // Check if user is scrolling inside an overflowing glass card on shorter screens
    const activeCard = document.querySelector(".section-scroll-stage.active .floating-glass-card");
    if (activeCard && activeCard.contains(e.target)) {
      const isAtTop = activeCard.scrollTop <= 2;
      const isAtBottom = Math.ceil(activeCard.scrollTop + activeCard.clientHeight) >= activeCard.scrollHeight - 2;
      if (e.deltaY > 0 && !isAtBottom) return;
      if (e.deltaY < 0 && !isAtTop) return;
    }

    if (isWheelScrollLocked || isProgrammaticScrolling) return;

    wheelAccumulator += e.deltaY;
    clearTimeout(wheelTimer);

    wheelTimer = setTimeout(() => {
      const threshold = 30;
      if (Math.abs(wheelAccumulator) >= threshold) {
        const now = Date.now();
        if (now - lastWheelJumpTime > 380) {
          if (wheelAccumulator > 0 && currentStageIndex < stageIds.length - 1) {
            isWheelScrollLocked = true;
            lastWheelJumpTime = now;
            jumpToStageIndex(currentStageIndex + 1);
            setTimeout(() => { isWheelScrollLocked = false; }, 650);
          } else if (wheelAccumulator < 0 && currentStageIndex > 0) {
            isWheelScrollLocked = true;
            lastWheelJumpTime = now;
            jumpToStageIndex(currentStageIndex - 1);
            setTimeout(() => { isWheelScrollLocked = false; }, 650);
          }
        }
      }
      wheelAccumulator = 0;
    }, 35);
  }, { passive: true });

  // Keyboard navigation (ArrowDown, ArrowUp, PageDown, PageUp, Space)
  window.addEventListener("keydown", (e) => {
    if (document.querySelector(".modal-overlay.active")) return;
    if (["ArrowDown", "PageDown"].includes(e.key) || (e.key === " " && !["input", "textarea"].includes(e.target.tagName.toLowerCase()))) {
      if (currentStageIndex < stageIds.length - 1) {
        e.preventDefault();
        jumpToStageIndex(currentStageIndex + 1);
      }
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      if (currentStageIndex > 0) {
        e.preventDefault();
        jumpToStageIndex(currentStageIndex - 1);
      }
    }
  });

  // Dynamic Window Resize: recompute framing to perfectly fill horizontal space
  window.addEventListener("resize", () => {
    updatePosterPosition(stageIds[currentStageIndex]);
  });

  // Clicking "Scroll down" or "Start Tour" in landing companion deck
  const btnDeckStart = document.getElementById("btn-deck-scroll") || document.getElementById("btn-deck-start") || document.getElementById("btn-scroll-start");
  if (btnDeckStart) {
    btnDeckStart.addEventListener("click", () => {
      jumpToStageIndex(1);
    });
    btnDeckStart.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        jumpToStageIndex(1);
      }
    });
  }

  // Clicking quick-jump chips in landing companion deck
  document.querySelectorAll(".deck-chip[data-jump]").forEach(chip => {
    chip.addEventListener("click", (e) => {
      e.preventDefault();
      const jumpKey = chip.getAttribute("data-jump");
      if (jumpKey) {
        setActiveStage(`stage-${jumpKey}`, true);
      }
    });
  });

  // Clicking "Ask Author" in landing companion deck
  const btnDeckChat = document.getElementById("btn-deck-chat");
  if (btnDeckChat) {
    btnDeckChat.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(qaModal);
      fetchQuestions();
      startPolling();
    });
  }

  // Clicking brand logo in header returns to Overview
  const brandWrapper = document.querySelector(".brand-wrapper");
  if (brandWrapper) {
    brandWrapper.style.cursor = "pointer";
    brandWrapper.setAttribute("title", "Return to Poster Overview");
    brandWrapper.addEventListener("click", () => {
      jumpToStageIndex(0);
    });
  }

  // Clicking floating stepper dots
  stepperDots.forEach(dot => {
    dot.addEventListener("click", () => {
      const stepKey = dot.getAttribute("data-step");
      const targetId = `stage-${stepKey}`;
      setActiveStage(targetId, true);
    });
  });

  // Clicking header jump pills
  jumpPills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      const jumpKey = pill.getAttribute("data-jump");
      const targetId = `stage-${jumpKey}`;
      setActiveStage(targetId, true);
    });
  });

  // ===========================================================================
  // 6. Section Detail Sheet Modal Engine ("Know More" Controller)
  // ===========================================================================
  function openSectionDetailModal(stageId) {
    if (!stageId || stageId === "stage-overview") return;
    const config = sectionConfig[stageId];
    if (!config) return;

    const payload = document.getElementById(`payload-${stageId}`);
    if (!payload || !sheetModalBody) return;

    if (sheetModalNum) sheetModalNum.textContent = config.num;
    if (sheetModalTag) sheetModalTag.textContent = config.subtitle;
    if (sheetModalTitle) sheetModalTitle.textContent = config.title.replace(/^\d+\.\s*/, "");

    sheetModalBody.innerHTML = payload.innerHTML;

    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(sheetModalBody, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch (err) {
        console.warn("KaTeX render error:", err);
      }
    }

    openModal(sectionDetailModal);
  }

  // Bind "Know More" button on floating capsule
  if (btnKnowMore) {
    btnKnowMore.addEventListener("click", (e) => {
      e.stopPropagation();
      openSectionDetailModal(stageIds[currentStageIndex]);
    });
  }

  // Bind "Know More" badge inside glowing highlight frame
  if (frameKnowMoreBadge) {
    frameKnowMoreBadge.addEventListener("click", (e) => {
      e.stopPropagation();
      openSectionDetailModal(stageIds[currentStageIndex]);
    });
  }

  // Bind direct click on highlight frame on the poster
  if (posterHighlightFrame) {
    posterHighlightFrame.addEventListener("click", () => {
      openSectionDetailModal(stageIds[currentStageIndex]);
    });
  }

  // Clicking capsule info group (badge + title) opens detail modal
  const capsuleInfoGroup = document.querySelector(".capsule-info-group");
  if (capsuleInfoGroup) {
    capsuleInfoGroup.addEventListener("click", () => {
      openSectionDetailModal(stageIds[currentStageIndex]);
    });
  }

  // Capsule Prev / Next buttons
  if (btnCapsulePrev) {
    btnCapsulePrev.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentStageIndex > 1) {
        jumpToStageIndex(currentStageIndex - 1);
      }
    });
  }

  if (btnCapsuleNext) {
    btnCapsuleNext.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentStageIndex < stageIds.length - 1) {
        jumpToStageIndex(currentStageIndex + 1);
      }
    });
  }

  // Close section detail modal button
  if (btnCloseSectionModal) {
    btnCloseSectionModal.addEventListener("click", () => {
      closeModal(sectionDetailModal);
    });
  }

  // Delegated click for "Next Section" buttons (works in modal & inline)
  document.addEventListener("click", (e) => {
    const nextBtn = e.target.closest(".btn-next-section-jump");
    if (nextBtn && nextBtn.hasAttribute("data-next")) {
      e.preventDefault();
      const nextId = nextBtn.getAttribute("data-next");
      closeModal(sectionDetailModal);
      setActiveStage(nextId, true);
    }
  });

  // ===========================================================================
  // 6. Modal Management Utility & Card Peek Handle
  // ===========================================================================
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add("active");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove("active");
    modalEl.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal-overlay.active")) {
      document.body.style.overflow = "";
    }
  }

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal-overlay.active");
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });

  // Peek at Poster: Minimize / Reveal Full High-Res Poster Behind
  document.addEventListener("click", (e) => {
    const peekBtn = e.target.closest(".btn-peek-poster");
    if (peekBtn) {
      e.preventDefault();
      e.stopPropagation();
      const card = peekBtn.closest(".floating-glass-card");
      if (card) {
        const isMin = card.classList.toggle("card-minimized");
        peekBtn.classList.toggle("active", isMin);
        const span = peekBtn.querySelector("span");
        if (span) span.textContent = isMin ? "Show" : "Peek";
      }
      return;
    }

    // Clicking anywhere on a minimized card restores it
    const minimizedCard = e.target.closest(".floating-glass-card.card-minimized");
    if (minimizedCard) {
      minimizedCard.classList.remove("card-minimized");
      const pBtn = minimizedCard.querySelector(".btn-peek-poster");
      if (pBtn) {
        pBtn.classList.remove("active");
        const span = pBtn.querySelector("span");
        if (span) span.textContent = "Peek";
      }
    }
  });

  // ===========================================================================
  // 7. Glossary Term Pop-up Modal Logic (With Formulas & Foundation Diagrams)
  // ===========================================================================
  const termModal = document.getElementById("term-modal");
  const termModalTitle = document.getElementById("term-modal-title");
  const termModalCat = document.getElementById("term-modal-cat");
  const termModalPlain = document.getElementById("term-modal-plain");
  const termModalMath = document.getElementById("term-modal-math");
  const termModalImg = document.getElementById("term-modal-img");
  const termModalCaption = document.getElementById("term-modal-caption");
  const termModalSignificance = document.getElementById("term-modal-significance");
  const btnCloseTermModal = document.getElementById("btn-close-term-modal");

  function showTermPopup(termKey) {
    const term = termDefinitions[termKey];
    if (!term) return;

    termModalTitle.textContent = term.name;
    termModalCat.textContent = term.category;
    termModalPlain.textContent = term.plain;

    // Publication-grade LaTeX rendering via KaTeX
    if (termModalMath) {
      if (term.math && term.math.trim() !== "") {
        termModalMath.style.display = "block";
        if (window.katex) {
          try {
            termModalMath.innerHTML = "";
            window.katex.render(term.math, termModalMath, {
              displayMode: true,
              throwOnError: false
            });
          } catch (err) {
            termModalMath.textContent = term.math;
          }
        } else {
          termModalMath.textContent = term.math;
        }
      } else {
        termModalMath.innerHTML = "";
        termModalMath.style.display = "none";
      }
    }

    // Conditionally show diagram container only if a dedicated, valid image exists
    const diagramBox = document.getElementById("term-modal-diagram-box");
    if (diagramBox) {
      if (term.imgSrc && term.imgSrc.trim() !== "") {
        termModalImg.src = term.imgSrc;
        termModalImg.alt = term.name;
        termModalCaption.textContent = term.caption || "";
        diagramBox.style.display = "block";
      } else {
        diagramBox.style.display = "none";
      }
    }

    if (termModalSignificance) {
      if (term.significance && term.significance.trim() !== "") {
        termModalSignificance.innerHTML = `<strong>Neuroscientific Significance:</strong> ${term.significance}`;
        termModalSignificance.style.display = "block";
      } else {
        termModalSignificance.style.display = "none";
      }
    }

    openModal(termModal);
  }

  document.addEventListener("click", (e) => {
    const chip = e.target.closest(".glossary-chip, [data-term]");
    if (chip && chip.hasAttribute("data-term")) {
      e.preventDefault();
      const termKey = chip.getAttribute("data-term");
      showTermPopup(termKey);
    }
  });

  if (btnCloseTermModal) {
    btnCloseTermModal.addEventListener("click", () => closeModal(termModal));
  }

  // ===========================================================================
  // 8. Figure Lightbox Modal Logic
  // ===========================================================================
  const figureModal = document.getElementById("figure-modal");
  const figModalTitle = document.getElementById("fig-modal-title");
  const figModalTag = document.getElementById("fig-modal-tag");
  const figModalImg = document.getElementById("fig-modal-img");
  const figModalCaption = document.getElementById("fig-modal-caption");
  const figModalTakeaways = document.getElementById("fig-modal-takeaways");
  const btnCloseFigModal = document.getElementById("btn-close-fig-modal");

  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".result-figure-thumb");
    if (thumb && thumb.hasAttribute("data-fig")) {
      e.preventDefault();
      const figKey = thumb.getAttribute("data-fig");
      const fig = figureDatabase[figKey];
      if (!fig) return;

      figModalTitle.textContent = fig.title;
      figModalTag.textContent = fig.tag;
      figModalImg.src = fig.imgSrc;
      figModalImg.alt = fig.title;
      figModalCaption.textContent = fig.caption;

      figModalTakeaways.innerHTML = fig.takeaways
        .map(t => `<li style="margin-bottom: 6px;">${t}</li>`)
        .join("");

      openModal(figureModal);
    }
  });

  if (btnCloseFigModal) {
    btnCloseFigModal.addEventListener("click", () => closeModal(figureModal));
  }

  // ===========================================================================
  // 9. About Modal Logic (Author: Sainath Murali & PI: Prof. Nivethida)
  // ===========================================================================
  const aboutModal = document.getElementById("about-modal");
  const btnOpenAbout = document.getElementById("btn-open-about");
  const btnCloseAboutModal = document.getElementById("btn-close-about-modal");

  if (btnOpenAbout) {
    btnOpenAbout.addEventListener("click", () => openModal(aboutModal));
  }
  if (btnCloseAboutModal) {
    btnCloseAboutModal.addEventListener("click", () => closeModal(aboutModal));
  }

  // ===========================================================================
  // 10. PDF Reader Modal Logic
  // ===========================================================================
  const pdfModal = document.getElementById("pdf-modal");
  const btnOpenPdf = document.getElementById("btn-open-pdf");
  const btnClosePdfModal = document.getElementById("btn-close-pdf-modal");

  if (btnOpenPdf) {
    btnOpenPdf.addEventListener("click", () => openModal(pdfModal));
  }
  if (btnClosePdfModal) {
    btnClosePdfModal.addEventListener("click", () => closeModal(pdfModal));
  }

  // ===========================================================================
  // 11. Live Question Portal Messenger (Attendee Chat + Author Admin Reply)
  // ===========================================================================
  const qaModal = document.getElementById("qa-modal");
  const btnOpenQa = document.getElementById("btn-open-qa");
  const btnCloseQaModal = document.getElementById("btn-close-qa-modal");
  const qaStreamArea = document.getElementById("qa-stream-area");
  const qaComposerForm = document.getElementById("qa-composer-form");
  const qaMessageInput = document.getElementById("qa-message-input");
  const attendeeNameInput = document.getElementById("attendee-name-input");
  const attendeeAffilInput = document.getElementById("attendee-affil-input");
  const attendeeInfoRow = document.getElementById("attendee-info-row");
  const btnToggleAuthorMode = document.getElementById("btn-toggle-author-mode");
  const qaModeIndicator = document.getElementById("qa-mode-indicator");

  let isAuthorMode = false;
  let activeThreadId = "thread-1";
  let pollInterval = null;
  let cachedThreads = [];

  if (btnOpenQa) {
    btnOpenQa.addEventListener("click", () => {
      openModal(qaModal);
      fetchQuestions();
      startPolling();
    });
  }

  if (btnCloseQaModal) {
    btnCloseQaModal.addEventListener("click", () => {
      closeModal(qaModal);
      stopPolling();
    });
  }

  function startPolling() {
    stopPolling();
    pollInterval = setInterval(fetchQuestions, 5000);
  }

  function stopPolling() {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  // Author Mode Toggle with PIN authentication
  btnToggleAuthorMode.addEventListener("click", () => {
    if (isAuthorMode) {
      isAuthorMode = false;
      qaModeIndicator.textContent = "Mode: Attendee";
      btnToggleAuthorMode.textContent = "Author Login";
      btnToggleAuthorMode.classList.remove("primary");
      attendeeInfoRow.style.display = "flex";
      qaMessageInput.placeholder = "Type your question or message here...";
    } else {
      const pin = prompt("Enter Author PIN (Sainath Murali):");
      if (pin && pin.toLowerCase().trim() === "sainath105") {
        isAuthorMode = true;
        qaModeIndicator.textContent = "Mode: Author (Sainath Murali)";
        btnToggleAuthorMode.textContent = "Switch to Attendee";
        btnToggleAuthorMode.classList.add("primary");
        attendeeInfoRow.style.display = "none";
        qaMessageInput.placeholder = "Type author response to attendees...";
        renderMessages();
      } else if (pin !== null) {
        alert("Incorrect PIN. Please enter author PIN 'sainath105'.");
      }
    }
  });

  // Quick Question Chip click
  document.querySelectorAll(".quick-question-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const query = chip.getAttribute("data-query");
      qaMessageInput.value = query;
      qaMessageInput.focus();
    });
  });

  async function fetchQuestions() {
    try {
      const res = await fetch("/api/questions");
      if (!res.ok) throw new Error("Failed to load questions");
      const data = await res.json();
      if (data.threads) {
        cachedThreads = data.threads;
        renderMessages();
      }
    } catch (err) {
      console.warn("Could not fetch remote questions, using local cache:", err);
      if (cachedThreads.length === 0) {
        cachedThreads = [
          {
            id: "thread-1",
            name: "Dr. Lukas Weber",
            affiliation: "TU Graz / BCI Lab",
            messages: [
              {
                sender: "attendee",
                senderName: "Dr. Lukas Weber (TU Graz)",
                text: "Why was the trial-wise pre-cue baseline chosen as the rest reference instead of a separate continuous resting-state block?",
                timestamp: "2026-09-10T10:30:00Z"
              },
              {
                sender: "author",
                senderName: "Sainath Murali (Author)",
                text: "Great question! The pre-cue baseline (-1.99s to 0s) isolates dynamic trial-by-trial task vs baseline divergence. Because resting states drift over long sessions, trial-wise baselines capture run-wise neural adaptation during MI training much more sensitively than static baseline blocks.",
                timestamp: "2026-09-10T11:15:00Z"
              }
            ]
          },
          {
            id: "thread-2",
            name: "Prof. Elena Rossi",
            affiliation: "BCI Society",
            messages: [
              {
                sender: "attendee",
                senderName: "Prof. Elena Rossi",
                text: "How do you reconcile the fact that both Improved and Worsened groups showed increasing left-right distinctiveness?",
                timestamp: "2026-09-10T12:00:00Z"
              },
              {
                sender: "author",
                senderName: "Sainath Murali (Author)",
                text: "This is precisely the core discovery: hemispheric laterality alone does NOT explain learning! While the Worsened group separated left and right centroids, their trial stability degraded and collapsed toward the rest baseline. True skill acquisition requires coordinated evolution of distinctiveness, stability, and rest divergence.",
                timestamp: "2026-09-10T12:45:00Z"
              }
            ]
          }
        ];
        renderMessages();
      }
    }
  }

  function renderMessages() {
    if (!qaStreamArea) return;
    qaStreamArea.innerHTML = "";

    cachedThreads.forEach(thread => {
      const threadHeader = document.createElement("div");
      threadHeader.style.cssText = "font-size: 0.74rem; font-weight: 700; color: var(--text-tertiary); text-align: center; margin: 8px 0;";
      threadHeader.textContent = `Thread: ${thread.name} ${thread.affiliation ? `(${thread.affiliation})` : ""}`;
      qaStreamArea.appendChild(threadHeader);

      thread.messages.forEach(msg => {
        const bubble = document.createElement("div");
        const isAuthorMsg = msg.sender === "author";
        bubble.className = `msg-bubble-item ${isAuthorMsg ? "author" : "attendee"}`;

        const senderTitle = document.createElement("div");
        senderTitle.className = "msg-sender-title";
        senderTitle.textContent = msg.senderName || (isAuthorMsg ? "Sainath Murali (Author)" : "Attendee");

        const msgBody = document.createElement("div");
        msgBody.textContent = msg.text;

        bubble.appendChild(senderTitle);
        bubble.appendChild(msgBody);
        qaStreamArea.appendChild(bubble);
      });
    });

    qaStreamArea.scrollTop = qaStreamArea.scrollHeight;
  }

  qaComposerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = qaMessageInput.value.trim();
    if (!text) return;

    const senderName = isAuthorMode
      ? "Sainath Murali (Author)"
      : (attendeeNameInput.value.trim() || "Conference Attendee");
    const affiliation = attendeeAffilInput.value.trim() || "";

    const payload = {
      threadId: activeThreadId,
      name: senderName,
      affiliation: affiliation,
      text: text,
      isAuthor: isAuthorMode,
      passcode: isAuthorMode ? "sainath105" : undefined
    };

    const optimisticMsg = {
      sender: isAuthorMode ? "author" : "attendee",
      senderName: senderName,
      text: text,
      timestamp: new Date().toISOString()
    };

    if (cachedThreads.length > 0) {
      cachedThreads[0].messages.push(optimisticMsg);
    } else {
      cachedThreads.push({
        id: "thread-new",
        name: senderName,
        affiliation: affiliation,
        messages: [optimisticMsg]
      });
    }
    renderMessages();
    qaMessageInput.value = "";

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchQuestions();
      }
    } catch (err) {
      console.warn("Error sending message to /api/questions, message preserved locally:", err);
    }
  });

  // Initial load: start at landing overview (full poster unblurred, no popup card)
  setActiveStage("stage-overview");
  window.scrollTo({ top: 0, behavior: "instant" });
  fetchQuestions();
});
