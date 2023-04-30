import { Component } from '@angular/core';

interface Step {
  name: string;
  hours: number;
  selected: boolean;
}

interface Scenario {
  name: string;
  steps: Step[];
}

@Component({
  selector: 'app-root',
  template: `
    <h2 class="total-hours">Total Hours: {{ totalHours }}</h2>
    <div class="scenario-dropdown">
      <label class="dropdown-label">Select Scenario:</label>
      <select class="dropdown-select" (change)="selectScenario($event)">
        <option value="" disabled [selected]="!scenarioSelected">Select...</option>
        <option *ngFor="let scenario of scenarios" [value]="scenario.name">
          {{ scenario.name }}
        </option>
      </select>
    </div>
    <ul class="step-list" *ngIf="currentScenario">
      <li *ngFor="let step of currentScenario.steps; let i = index" class="step-item">
        <label class="step-label">
          <input
            type="checkbox"
            [checked]="step.selected"
            (change)="updateTotalHours(step, i)"
          />
          {{ step.name }}
        </label>
      </li>
    </ul>
  `,
  styles: [`
    .total-hours {
      font-size: 24px;
      color: #333;
    }

    .scenario-dropdown {
      margin-bottom: 16px;
    }

    .dropdown-label {
      font-size: 18px;
      font-weight: bold;
      color: #666;
    }

    .dropdown-select {
      padding: 8px;
      font-size: 16px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    .step-list {
      list-style-type: none;
      padding: 0;
    }

    .step-item {
      margin-bottom: 8px;
    }

    .step-label {
      font-size: 16px;
      color: #333;
    }
  `],
})
export class StepListComponent {
  scenarios: Scenario[] = [
    {
      name: 'Print Advertisement',
      steps: [
        { name: 'Identify the objective', hours: 2, selected: false },
        { name: 'Understand the target audience', hours: 4, selected: false },
        { name: 'Develop the creative concept', hours: 8, selected: false },
        { name: 'Choose the format and size', hours: 2, selected: false },
        { name: 'Create a rough draft', hours: 4, selected: false },
        { name: 'Write the copy', hours: 4, selected: false },
        { name: 'Choose the visuals', hours: 4, selected: false },
        { name: 'Design the layout', hours: 8, selected: false },
        { name: 'Review and revise', hours: 2, selected: false },
        { name: 'Submit for publication', hours: 2, selected: false },
        { name: 'Evaluate the performance', hours: 2, selected: false },
      ],
    },
    {
      name: 'Facebook Copy Ad',
      steps: [
        { name: 'Understand the client\'s objectives and target audience', hours: 2, selected: false },
        { name: 'Research the market and competitors', hours: 3, selected: false },
        { name: 'Develop a compelling value proposition', hours: 2, selected: false },
        { name: 'Define key messages and call-to-action', hours: 1, selected: false },
        { name: 'Determine the ad format (image, video, carousel, etc.)', hours: 1, selected: false },
        { name: 'Write a captivating headline', hours: 1, selected: false },
        { name: 'Craft engaging ad copy', hours: 2, selected: false },
        { name: 'Create a sense of urgency or exclusivity', hours: 1, selected: false },
        { name: 'Ensure compliance with Facebook\'s ad policies', hours: 1, selected: false },
        { name: 'Test and optimize the ad copy', hours: 2, selected: false },
        { name: 'Coordinate with the design team for visuals', hours: 1, selected: false },
        { name: 'Proofread and edit the ad copy', hours: 1, selected: false },
        { name: 'Collaborate with the client for feedback and revisions', hours: 2, selected: false },
        { name: 'Finalize the ad copy and submit for approval', hours: 1, selected: false },
      ],
    },
  ];

  currentScenario?: Scenario;
  totalHours = 0;
  scenarioSelected = false;

  selectScenario(scenarioName: any): void {
    if (scenarioName) {
      this.currentScenario = this.scenarios.find(
        (scenario) => scenario.name === scenarioName.target.value
      );
      this.resetSelectedSteps();
      this.calculateTotalHours();
      this.scenarioSelected = true;
    } else {
      this.currentScenario = undefined;
      this.totalHours = 0;
      this.scenarioSelected = false;
    }
  }


  resetSelectedSteps(): void {
    if (this.currentScenario) {
      this.currentScenario.steps.forEach((step) => {
        step.selected = false;
      });
    }
  }

  updateTotalHours(step: Step, index: number): void {
    if (step.selected) {
      // Uncheck all steps after the current step
      // @ts-ignore
      for (let i = index + 1; i < this.currentScenario.steps.length; i++) {
        // @ts-ignore
        this.currentScenario.steps[i].selected = false;
      }
    } else {
      // Check all steps before and including the current step
      for (let i = 0; i <= index; i++) {
        // @ts-ignore
        this.currentScenario.steps[i].selected = true;
      }
    }

    this.calculateTotalHours();
  }

  calculateTotalHours(): void {
    if (this.currentScenario) {
      this.totalHours = this.currentScenario.steps
        .filter((step) => step.selected)
        .reduce((sum, step) => sum + step.hours, 0);
    }
  }
}
