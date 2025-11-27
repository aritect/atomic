import React from "react";

import {
  HorizontalSegmentedChart,
} from "@/components-ui-lib/charts/horizontal-segmented-chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components-ui-lib/table";
import { CodeArrowsIcon } from "@/icons-ui-lib/code-arrows-icon";
import { CodeIcon } from "@/icons-ui-lib/code-icon";
import { FileXmlICodeIcon } from "@/icons-ui-lib/file-xml-i-code-icon";
import { GlobeIcon } from "@/icons-ui-lib/globe-icon";
import { LockIcon } from "@/icons-ui-lib/lock-icon";
import { SmartphoneIcon } from "@/icons-ui-lib/smartphone-icon";
import { UnplugIcon } from "@/icons-ui-lib/unplug-icon";
import { round } from "@/utils-ui-lib/round";
import { Badge } from "@/components-ui-lib/badge";

enum TestStatus {
  OK = "OK",
  Alert = "Alert",
  Paused = "Paused",
}

enum TestType {
  Browser = "Browser",
  API = "API",
  MultistepAPI = "Multistep API",
  Mobile = "Mobile",
  WebSocket = "WebSocket",
  SSL = "SSL",
  gRPC = "gRPC",
}

type Test = {
  id: string;
  name: string;
  status: TestStatus;
  type: TestType;
  domain: string;
  tags: string[];
  envs: string[];
  team: string;
  uptime: number | null;
  lastModified: string;
};

const TESTS: Test[] = [
  {
    id: "eb93361a-6e6b-4ca7-bdfa-8cb197d58c5f",
    name: "User Login",
    status: TestStatus.OK,
    type: TestType.Browser,
    domain: "www.notion.so/login",
    tags: ["p0"],
    envs: ["prod"],
    team: "Authentication",
    uptime: 100,
    lastModified: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-klmnopqrstuv",
    name: "Sign-Up Flow",
    status: TestStatus.Paused,
    type: TestType.Browser,
    domain: "www.notion.so/signup",
    tags: ["p1"],
    envs: ["staging"],
    team: "Onboarding",
    uptime: 95,
    lastModified: "2023-03-01T12:34:56.789Z",
  },
  {
    id: "w1x2y3z4-a5b6-c7d8-e9f0-ghijklmnopqr",
    name: "User Data API",
    status: TestStatus.OK,
    type: TestType.API,
    domain: "api.notion.so/user",
    tags: ["p0"],
    envs: ["prod"],
    team: "Backend",
    uptime: 90.7,
    lastModified: "2023-02-15T09:21:45.123Z",
  },
  {
    id: "s1t2u3v4-w5x6-y7z8-a9b0-cdefghijklmn",
    name: "Document Creation",
    status: TestStatus.OK,
    type: TestType.Browser,
    domain: "www.notion.so/create-document",
    tags: ["p2"],
    envs: ["prod", "staging"],
    team: "Editor",
    uptime: 100,
    lastModified: "2023-05-10T08:17:24.456Z",
  },
  {
    id: "o1p2q3r4-s5t6-u7v8-w9x0-yzabcdefghijkl",
    name: "Mobile Login",
    status: TestStatus.OK,
    type: TestType.Mobile,
    domain: "m.notion.so/login",
    tags: ["p0"],
    envs: ["prod"],
    team: "Mobile",
    uptime: 99.9,
    lastModified: "2023-04-05T15:32:18.789Z",
  },
  {
    id: "m1n2o3p4-q5r6-s7t8-u9v0-wxyzabcdefghij",
    name: "WebSocket Connection",
    status: TestStatus.Alert,
    type: TestType.WebSocket,
    domain: "ws.notion.so/connect",
    tags: ["p1"],
    envs: ["prod"],
    team: "Realtime",
    uptime: 97.3,
    lastModified: "2023-01-20T11:45:33.567Z",
  },
  {
    id: "k1l2m3n4-o5p6-q7r8-s9t0-uvwxyzabcdefg",
    name: "Payment Gateway",
    status: TestStatus.OK,
    type: TestType.API,
    domain: "api.notion.so/payment",
    tags: ["p0"],
    envs: ["prod"],
    team: "Payments",
    uptime: 100,
    lastModified: "2023-06-01T10:12:45.678Z",
  },
  {
    id: "j1k2l3m4-n5o6-p7q8-r9s0-tuvwxyzabcdef",
    name: "SSL Certificate Check",
    status: TestStatus.OK,
    type: TestType.SSL,
    domain: "www.notion.so",
    tags: ["p0"],
    envs: ["prod"],
    team: "Security",
    uptime: null,
    lastModified: "2023-02-28T14:27:36.890Z",
  },
  {
    id: "i1j2k3l4-m5n6-o7p8-q9r0-stuvwxyzabcde",
    name: "gRPC User Service",
    status: TestStatus.OK,
    type: TestType.gRPC,
    domain: "api.notion.so/user",
    tags: ["p1"],
    envs: ["prod"],
    team: "Backend",
    uptime: 99.2,
    lastModified: "2023-03-14T16:38:49.012Z",
  },
  {
    id: "g1h2i3j4-k5l6-m7n8-o9p0-qrsuvwxyzabc",
    name: "User Profile Load",
    status: TestStatus.OK,
    type: TestType.Browser,
    domain: "www.notion.so/profile",
    tags: ["p2"],
    envs: ["prod"],
    team: "Frontend",
    uptime: 99.8,
    lastModified: "2023-05-30T09:48:12.678Z",
  },
];

const TEST_TYPE_ICON = {
  [TestType.Browser]: GlobeIcon,
  [TestType.API]: CodeIcon,
  [TestType.MultistepAPI]: FileXmlICodeIcon,
  [TestType.Mobile]: SmartphoneIcon,
  [TestType.WebSocket]: UnplugIcon,
  [TestType.SSL]: LockIcon,
  [TestType.gRPC]: CodeArrowsIcon,
};

function StatusCell({ status }: { status: TestStatus }) {
  return (
    <TableCell className="w-[90px]">
      <Badge variant={status === TestStatus.OK ? "outline-default" : "outline-destructive"}>
        {status}
      </Badge>
    </TableCell>
  );
}

function TypeCell({ type }: { type: TestType }) {
  const Icon = TEST_TYPE_ICON[type];

  return (
    <TableCell className="w-[140px]">
      <div className="flex items-center gap-x-1.5">
        <Icon size={14} className="text-muted-foreground" />
        {type}
      </div>
    </TableCell>
  );
}

function TagsCell({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <TableCell className={className}>
      <div className="flex items-center gap-x-1.5">
        {tags.map((tag, i) => (
          <div className="bg-muted text-xs px-1.5 py-1" key={i}>
            {tag}
          </div>
        ))}
      </div>
    </TableCell>
  );
}

function TeamCell({ team }: { team: string }) {
  return (
    <TableCell className="w-[150px]">
      <Badge variant="outline-default">{team}</Badge>
    </TableCell>
  );
}

function UptimeCell({ uptime }: { uptime: number | null }) {
  return (
    <TableCell className="max-w-[120px]">
      {uptime === null && (
        <span className="text-muted-foreground whitespace-nowrap">
          No uptime data
        </span>
      )}
      {uptime !== null && (
        <HorizontalSegmentedChart
          data={[
            { value: uptime },
            { value: round(100 - uptime, 2) },
          ]}
        />
      )}
    </TableCell>
  );
}

const getTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} Years Ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} Months Ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} Days Ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} Hours Ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} Minutes Ago`;
  }
  return `${Math.floor(seconds)} Seconds Ago`;
};

const TableDemo = () => (
    <div className="overflow-auto border">
      <Table className="w-max">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Envs</TableHead>
            <TableHead>Teams</TableHead>
            <TableHead>Uptime</TableHead>
            <TableHead className="text-right">Last Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TESTS.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="w-[200px]">{test.name}</TableCell>
              <StatusCell status={test.status} />
              <TypeCell type={test.type} />
              <TableCell className="w-[160px] max-w-[160px] overflow-hidden truncate">
                {test.domain}
              </TableCell>
              <TagsCell tags={test.tags} className="w-[60px]" />
              <TagsCell tags={test.envs} className="w-[140px]" />
              <TeamCell team={test.team} />
              <UptimeCell uptime={test.uptime} />
              <TableCell className="w-[140px] text-right">
                {getTimeAgo(test.lastModified)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
);

export { TableDemo };
